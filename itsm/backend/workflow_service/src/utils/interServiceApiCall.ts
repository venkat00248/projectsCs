import axios from 'axios'
import dotenv from "dotenv"
dotenv.config()

export class ServiceCommunication {
    constructor(){

    }
    async sendStatusUpdate(ticketId: string, statusPayload: object){
        try{
          const ticketServiceBaseUrl = `${process.env.TICKET_SERVICE_BASE_URL}/ticket/setTicketStatus`
          await axios.post(ticketServiceBaseUrl,{
            ticketId: ticketId,
            status: statusPayload
          })
        }catch(error){
            throw error
        }
    }
}