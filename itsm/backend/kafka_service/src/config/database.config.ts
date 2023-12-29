import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connect = async () => {
    try {
        const conn_uri = `mongodb://${process.env.MONGO_NOTIFICATIONS_HOST}:${process.env.MONGO_NOTIFICATIONS_PORT}/${process.env.MONGO_NOTIFICATIONS_DATABASE_NAME}`
        await mongoose.connect(conn_uri)
    } catch (err) {
        throw err
    }
}