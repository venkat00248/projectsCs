import {Kafka} from 'kafkajs'
import dotenv from 'dotenv';
import logger from '../config/logger.config';
dotenv.config()
const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER_URL!]
  });

export async function consumer() {
    try {
      const consumer = kafka.consumer({groupId: process.env.KAFKA_CONSUMER_GROUP_ID!})
      await consumer.connect();
  
      await consumer.subscribe({
        topic: process.env.KAFKA_TOPIC!,
        fromBeginning: false
      });
  
      // let msgs:any = []
      await consumer.run({
        eachMessage: async result => {
            const { Type, userID, Serivice_name, tenantId, Payload, message }:any = result.message.value
            logger.error(message, {
                type: Type,
                service: Serivice_name,
                payload: Payload,
                user: userID,
                tenant: tenantId
              });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }