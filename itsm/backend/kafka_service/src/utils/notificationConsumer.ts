import { KafkaConsumer } from "../interfaces/consumer.interface";
import { Consumer } from "./kafkaConsumer";
import { connect } from "../config/database.config";
import { Message } from "../models/message.mode";
import dotenv from 'dotenv';
import { postDataInRedis } from "./redis";
dotenv.config()


export class NotificationConsumer extends Consumer implements KafkaConsumer {
    constructor() {
        super();
    }

    async run(): Promise<void> {
        try {
            const groupId = process.env.KAFKA_NOTIFICATION_CONSUMER_GROUP_ID!
            const topic = process.env.KAFKA_NOTIFICATION_TOPIC!
            const consumer = await this.subscribeTopic(groupId, { topic: topic, fromBeginning: false })
            await consumer.run({
                eachMessage: async result => {
                    console.log("Inside consumer")
                    console.log(`Consumer: ${result.message.value} on partition ${result.partition}`);
                    const { value } = result.message
                    await connect();
                    if (value) {
                        const val = JSON.parse(value.toString())
                        await Message.create({
                            title: val.title,
                            status: val.status,
                            message: val.message
                        })
                       await postDataInRedis(val) 
                    }
                }
            });
        } catch (err) {
            throw err
        }
    }
}