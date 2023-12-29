import { kafka } from "../api/message_queue";
import { ConsumerOptions } from "src/types";


export class Consumer {
    constructor(){

    }

    async subscribeTopic(groupId:string,options: ConsumerOptions){
      try{
         const consumer = kafka.consumer({groupId: groupId})
         await consumer.connect()
         await consumer.subscribe(options)
         return consumer
      } catch(err){
        throw err
      }
    }
}