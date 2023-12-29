import { Request, Response, NextFunction, Router } from "express";
import { body } from "express-validator";
import { Kafka } from "kafkajs";
import { 
  Schema, 
  model, 
  connect 
} from "mongoose";

import { handleValidationErrors } from "../utils";
// import { NotFoundError } from "@errors";
const { KAFKA: {
  BROKERS,
  CLIENT_ID,
  CONSUMER_GROUP_ID,
  TOPIC,
  DB
} } = require('../utils/config');

const router: Router = Router();


const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS
});



    // const { topic } = TOPIC
    const consumer = kafka.consumer({ groupId: CONSUMER_GROUP_ID });
    

// 1. Create an interface representing a document in MongoDB.
interface IMyShift {
  topic_name: string;
  data: string;
  created_at?: Date;
}


// 2. Create a Schema corresponding to the document interface.
const myShiftSchema = new Schema<IMyShift>({
  topic_name: { type: String, required: true },
  data: { type: String, required: true },
  created_at: Date
});

// 3. Create a Model.
const myShiftRaw = model<IMyShift>('myshift_raw', myShiftSchema);

// Create topic
// CLIENT_ID: 'mahesh_kafka_app',
// CONSUMER_GROUP_ID: 'mahesh_g1',
// TOPIC: 'mahesh_new_topic'

// Listen to messages in topic
async function consume() {
  try {
    console.log('##############################################')
    console.log("consumer is listening....")


    console.log('Connecting to Kafka . . .');
    await consumer.connect();
    console.log('Connected to Kafka !!');

    await consumer.subscribe({
      topic: TOPIC,
      // topic: topic,
      // fromBeginning: true
      fromBeginning: false
    });

    // let msgs:any = []
    await consumer.run({
      eachMessage: async result => {
        console.log("Inside consumer")
        console.log(`Consumer: ${result.message.value} on partition ${result.partition}`);

        /** */
        const conn_uri = `mongodb://${DB.MONGO_KAFKA.UAT.HOST}:${DB.MONGO_KAFKA.UAT.PORT}/${DB.MONGO_KAFKA.UAT.DATABASE_NAME}`
        await connect(conn_uri);

        console.log(conn_uri)

        const myShiftRes = new myShiftRaw({
          topic_name: TOPIC,
          data: result.message.value,
          created_at: new Date()
        });
        await myShiftRes.save();
        console.log('##############################################')
        console.log(myShiftRes.data); 
        console.log('##############################################')

        /** */
        // TODO:
        // push result data to posgres/mongo here
        // write result to a file
        // msgs.push(result)
      }
    });


  } catch (err) {
    console.log(err);
  }
}

// consume()
export { router as MessageQueueRoutes, consume };
