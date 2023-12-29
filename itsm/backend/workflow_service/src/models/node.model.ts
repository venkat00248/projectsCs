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

export interface INode {
    id: string;
    description: string;
    name: string;
    type: string;
    target: string[];
    source: string[];
    properties: any[];
    workflowId: object;
    isStart: boolean;
    isEnd: boolean;
    timeLogs: object[];
    actions: object[];
    beforeActions: object[];
    validations: object[];
}

const NodeSchema = new Schema<INode>({
    id: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    target: {
       type: [String],
       default: []
    },
    isStart: {
        type: Boolean,
        default: false
    },
    isEnd: {
        type: Boolean,
        default: false
    },
    timeLogs: {
        type: Schema.Types.Mixed,
        defualt: []
    },
    source: {
        type: [String],
        default: []
    },
    properties: {
        type: Schema.Types.Mixed,
        default: []
    },
    actions:[{
        type: Schema.Types.ObjectId,
        ref: 'Action'
    }],
    beforeActions:[{
        type: Schema.Types.ObjectId,
        ref: 'Action'
    }],
    validations:[{
        type: Schema.Types.ObjectId,
        ref: 'Validation'
    }],
    workflowId: {
        type: Schema.Types.ObjectId,
        ref: 'WorkFlow'
    },
},{timestamps: true})

export const node = model<INode>('Node', NodeSchema) 