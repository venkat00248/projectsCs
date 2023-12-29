import { createClient } from 'redis';

export const client = createClient({
    socket: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST
    }
})

export async function connectRedis() {
    await client.connect();
}