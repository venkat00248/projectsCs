import { createClient } from "redis";
import dotenv from 'dotenv'
dotenv.config()

const client = createClient({
    socket: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST
    }
})

async function connectRedis() {
    await client.connect();
}

export async function postDataInRedis(msgs: any) {
    try {
        const key = process.env.REDIS_MIGRATION_KEY!
        await connectRedis()
        await client.set(key, JSON.stringify(msgs))
        await client.disconnect()
    } catch (err) {
        throw err
    }
}