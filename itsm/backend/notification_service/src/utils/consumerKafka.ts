import {Kafka} from 'kafkajs'
import { Socket } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config()
const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER_URL]
  });

export async function consumer(socket: Socket) {
    try {
      const consumer = kafka.consumer({groupId: process.env.KAFKA_CONSUMER_GROUP_ID})
      await consumer.connect();
  
      await consumer.subscribe({
        topic: process.env.KAFKA_TOPIC_NAME,
        fromBeginning: false
      });
  
      // let msgs:any = []
      await consumer.run({
        eachMessage: async result => {
          socket.emit('unread',result?.message?.value)
        }
      });
    } catch (err) {
      console.log(err);
    }
  }