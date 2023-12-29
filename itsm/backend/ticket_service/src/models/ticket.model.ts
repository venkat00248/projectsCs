import { Schema, model} from "mongoose";
  export interface ITicket {
  id: any;
  from: string,
  Ticket_ID: string,
  tickettypeid: Object,
  priority: string,
  customer_ticket_ref_id: string,
  name: string,
  subject: string,
  description: string,
  serverInfo: string,
  instance_type: string,
  customer_attachment_url: string,
  status: object
}

const TicketSchema = new Schema<ITicket>({
    from: {
      type: String,
      default: ""
    },
    Ticket_ID: {
      type: String,
      default: ""
    },
    tickettypeid: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      default: ""
    },
    status: {
      type: Schema.Types.Mixed,
    },
    customer_ticket_ref_id: {
      type: String,
      default:""
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    serverInfo: {
      type: String,
      default: ""
    },
    instance_type: {
      type: String,
      default: ""
    },
    customer_attachment_url: {
      type: String,
      default: ""
    }
  }, {timestamps: true})
  
  export const Ticket = model<ITicket>('Ticket', TicketSchema) 