import { fetchNextJob,markCompleted,markFailed } from "./query.js"

export async function worker(worker_id){
    console.log(`worker ${worker_id} started`)

   while(true){
    const job=await fetchNextJob([worker_id])
    // console.log(job, "typeof",job)

    if(!job){
        console.log(`No job ${worker_id} worker`)
         // small waiting
        await new Promise((resolve)=> setTimeout(resolve,1500))
        continue
    }
    
    console.log(`Worker ${worker_id}: Processing job ${job.id}`);
    
    try {
        // fake work
        await new Promise((r) => setTimeout(r, 1000));
        //  if(worker_id==5){
        //         throw new Error("Db failed !!")
        //  }
  
        console.log(`Worker ${worker_id}: Completed job ${job.id}`);
        await markCompleted(job.id);
      } catch (err) {
        console.log(
          `Worker ${worker_id}: Failed job ${job.id}`
        );
        await markFailed(job.id);
      }
}
} 