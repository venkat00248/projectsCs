import { Schema, model } from 'mongoose'

enum Status {
    read = "READ",
    unread = "UNREAD"
}

interface IMessage {
    title: string;
    message: string;
    status: Status;
}

const messageSchema = new Schema<IMessage>({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},{timestamps: true})

export const Message = model<IMessage>('Message', messageSchema) 