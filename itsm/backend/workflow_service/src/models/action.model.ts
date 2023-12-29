import { Schema, model } from 'mongoose'
//import { task } from './task.model';

interface IActions {
    type: string;
    payload: object;
    isActive: boolean;
    taskId: object;
    apis: object[];
}

const actionSchema = new Schema<IActions>({
    type: {
        type: String,
        required: true
    },
    payload: {
        type: Schema.Types.Mixed,
        default: {}
    },
    /*tasks:{
        type: [task],
        default: []
    },*/
    isActive: {
        type: Boolean,
        default: true
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Node'
    },
    apis:[{
        type: Schema.Types.ObjectId,
        ref: 'Api'
    }]
},{timestamps: true})

export const Actions = model<IActions>('Action', actionSchema) 