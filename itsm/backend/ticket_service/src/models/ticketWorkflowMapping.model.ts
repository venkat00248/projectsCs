import { Schema, model } from "mongoose";
  export interface IMapping {
  ticketTypeId: object;
  workFlowId: object;
  isActive: boolean;
  createdBy: string;
  description: string;
  isPublished: boolean;
}

const mappingSchema = new Schema<IMapping>({
    ticketTypeId:{
        type: Schema.Types.ObjectId,
        ref: 'TicketType'
    },
    workFlowId: {
        type: Schema.Types.ObjectId
    },
    isActive: {
      type: Boolean,
      default: true
    },
    description: {
      type: String
    },
    createdBy: {
      type: String
    },
    isPublished: {
      type: Boolean,
      default: false
    }
  }, {timestamps: true})
  
  export const TicketTypeWFMapping = model<IMapping>('MapTypeWF', mappingSchema) 