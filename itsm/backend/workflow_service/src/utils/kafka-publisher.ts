import {Kafka} from 'kafkajs'
import dotenv from 'dotenv';
dotenv.config()

export class KafkaProducer {
  private static instance: KafkaProducer;
  private _producer:any = null;
  private _isConnected = false;

  private constructor() {
    const kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENTID,
      brokers: [process.env.KAFKA_TOPIC!]
    });
    this._producer = kafka.producer();
  }

  public static getInstance(): KafkaProducer {
    if (!KafkaProducer.instance) {
      KafkaProducer.instance = new KafkaProducer();
    }
    return KafkaProducer.instance;
  }

  public get isConnected() {
    return this._isConnected;
  }

  async sendMessage(message:any) {
    try{
        let kafka = KafkaProducer.getInstance();
        if (!kafka.isConnected) {
          await kafka.connect();
        }
        await kafka._producer.send({
          topic: process.env.KAFKA_TOPIC,
          messages: [
            {
              value: JSON.stringify(message),
              "partition": 0
            },
          ],
        });
   
    } catch(error){
        throw error
    }
  }

  async connect(): Promise<void> {
    try {
      await this.producer.connect();
      this._isConnected = true;
    } catch (err) {
      console.error(err);
      throw err
    }
  }

  get producer() {
    return this._producer;
  }
}