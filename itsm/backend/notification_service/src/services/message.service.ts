import { Message } from "../models/message";

export async function getUnreadMessages() {
    try {
       const messages = await Message.find().where('status').equals('UNREAD')
       return messages
    } catch (err) {
        throw err
    }
}