import { db } from "../db/db.js";

export async function fetchNextJob([worker_id]){
    const query=`UPDATE messages
  SET locked_by = ?, locked_at = strftime('%s','now'),status =1
  WHERE id = (
    SELECT id FROM messages
    WHERE status = 0
      AND (locked_by IS NULL OR locked_at < strftime('%s','now'))
    ORDER BY id
    LIMIT 1
  )
  RETURNING id, topic, payload, locked_at
`

const result=await db.prepare(query).get(worker_id)
return result;
}

export async function markCompleted(job_id){
    const query=`
     update messages set status=2 where id = ?;
    `
 await db.prepare(query).run(job_id);
}

export async function markFailed(job_id){
    const query=`
     update messages set status=3 where id = ?;
    `
  await db.prepare(query).run(job_id);
}