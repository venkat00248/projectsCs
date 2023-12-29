import { Schema, model } from 'mongoose'


interface logMessage {
    "Type": string,
    "userID": string,
    "Serivice_name": string,
    "tenantId": string,
    "Payload": any,
    "message": string,
    "uuid": string
}

const messageSchema = new Schema<logMessage>({
    Type: {
        type: String,
    },
    userID: {
        type: String,
    },
    Serivice_name: {
        type: String,
        required: true
    },
    tenantId: {
        type: String,
    },
    Payload: {
        type: Schema.Types.Mixed,
        default: {}
    },
    message: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Message = model<logMessage>('loggerMessage', messageSchema) 