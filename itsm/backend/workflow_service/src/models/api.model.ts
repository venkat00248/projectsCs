import { Schema, model } from 'mongoose'
/*import { Flow } from './workflow.model';
Flow.schema*/
import { Actions } from './action.model';
import { Validations } from './validation.model';
Actions.schema
Validations.schema

/*type TimeLog = {
    startTime: string | null,
    endTime: string | null,
    createdAt: string | null
}*/

export interface IApi {
    id: string;
    description: string;
    method: string;
    url: string;
    body: object;
    queryParams: string;
    headers: object;
    params: string;
    actionId: object;
    isActive: boolean;
    dependsOn: string;
}

const ApiSchema = new Schema<IApi>({
    description: {
        type: String
    },
    method: {
        type: String,
        required: true
    },
    url: {
       type: String,
       required: true
    },
    dependsOn: {
        type: String
    },
    body: {
        type: Schema.Types.Mixed,
        default: {}
    },
    queryParams: {
        type: String
    },
    params: {
        type: String
    },
    headers:{
        type: Schema.Types.Mixed,
        default: {}
    },
    actionId:{
        type: Schema.Types.ObjectId,
        ref: 'Action'
    },
    isActive:{
        type: Boolean,
        default: true
    }
},{timestamps: true})

export const api = model<IApi>('Api', ApiSchema) 