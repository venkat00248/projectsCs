import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connect = async() =>{
    try{
    await mongoose.connect(process.env.DB_URI)
    } catch(err){
        throw err
    }
}