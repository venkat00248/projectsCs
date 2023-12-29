import { ScheduleOptions } from 'node-cron';
import { Message } from '../models/message';
import moment from "moment";
import { client, connectRedis } from '../config/redis.config';
import dotenv from 'dotenv'
import agenda from '../agenda';
dotenv.config()

export const scheduleMigrationOptions: ScheduleOptions = {
    scheduled: true,
    timezone: 'Asia/Kolkata',
    name: 'migration',
    recoverMissedExecutions: false
}

export async function scheduleMigrationAction() {
    try {
        const msgs = await getPastRecordsByTime(30)
        const val = await postDataInRedis(msgs)
        console.log("val================", val)
    } catch (err) {
        throw err
    }
}

export async function scheduleMigrationService(name: string, timer: string) {
    try {
        await agenda.every(timer, name)
    } catch (err) {
        throw err
    }
}

async function getPastRecordsByTime(days: number) {
    try {
        const lastDate = moment().subtract(days, 'days').toDate()
        const msgs = await Message.find({
            createdAt: {
                $gte: lastDate
            }
        }).sort({ createdAt: "desc" })
        return msgs
    } catch (err) {
        throw err
    }
}

async function postDataInRedis(msgs: any) {
    try {
        const key = process.env.REDIS_MIGRATION_KEY!
        await connectRedis()
        await client.set(key, JSON.stringify(msgs))
        const value = await client.get(key)
        console.log('value from redis========================',value)
        await client.disconnect()
        return value
    } catch (err) {
        throw err
    }
}

