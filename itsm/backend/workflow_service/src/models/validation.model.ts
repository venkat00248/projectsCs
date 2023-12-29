import { Schema, model } from 'mongoose'
//import { task } from './task.model';

interface IValidations {
    type: string;
    payload: object;
    isActive: boolean;
    taskId: object;
}

const validationSchema = new Schema<IValidations>({
    type: {
        type: String
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
    }
},{timestamps: true})

export const Validations = model<IValidations>('Validation', validationSchema) 