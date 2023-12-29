import { Schema, model } from "mongoose";
  export interface ITicketType {
  type: string;
  createdBy: string;
  workFlowId: Object;
  id: number
}

const TicketTypeSchema = new Schema<ITicketType>({
    type:{
        type: String,
        required: true
    },
    createdBy: {
      type: String
    },
    id:{
      type: Number,
      required: true
    }
  }, {timestamps: true})
  
  export const TicketType = model<ITicketType>('TicketType', TicketTypeSchema) 