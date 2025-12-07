import { worker } from "./utils/worker.js";

const No_Worker=5;

async function start(){

  await  Promise.all(
    Array.from({length:No_Worker}).map((_,indx)=>{
        worker(indx+1)
    })
  )
}

start()
