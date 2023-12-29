import { Agenda } from "@hokify/agenda";
import dotenv from 'dotenv';
dotenv.config()

const connString: string = process.env.CRON_DB_URI!

const agenda = new Agenda({
    db: {
        address: connString,
        collection: process.env.DB_COLLECTION,
    },
    maxConcurrency: 20
})

agenda
    .on('ready', async () => {
        await agenda.start()
        console.log("Agenda started!")
    })
    .on('error', () => console.log("Agenda connection error!"));

export default agenda