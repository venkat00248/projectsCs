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


export const kafka = new Kafka({
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
router.post(
  "/create_topic",
  [body("topic").exists()],
  async (req: Request, res: Response, next: NextFunction) => {


    const { topic } = req.body
    console.log(topic)
    try {
      handleValidationErrors(req);
      // throw new NotFoundError("Sorry, can't find it!", 500, { hello: "world"});

      const admin = kafka.admin();
      console.log('Connecting to Kafka . . .');
      await admin.connect();
      console.log('Connected to Kafka !!');

      await admin.createTopics({
        topics: [{
          // topic: TOPIC,
          topic: topic,
          numPartitions: 2
        }]
      });

      // console.log(`Topic - ${TOPIC} Created Successfully!`);
      console.log(`Topic - ${topic} Created Successfully!`);
      await admin.disconnect();

      res.status(200).send({
        success: true,
        body: req.body
      });
    } catch (err) {
      next(err);
    }
  }
);

// Produce a message in selected topic
router.post("/produce", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { topic, message, partition } = req.body

    console.log(message)

    let value: any
    if (typeof message === 'string' || message instanceof String)
      // it's a string
      value = message
    else
      // it's something else
      value = JSON.stringify(message)

    const producer = kafka.producer();
    console.log('Connecting to Kafka . . .');
    await producer.connect();
    console.log('Connected to Kafka !!');

    const result = await producer.send({
      // topic: TOPIC,
      topic: topic,
      messages: [{ value, partition }]
    });

    console.log(`Sent Successfully! ${JSON.stringify(result)}`);
    await producer.disconnect();
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    next(err);
  }
});

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
