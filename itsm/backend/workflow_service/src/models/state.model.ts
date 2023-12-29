import { Schema, model } from 'mongoose'
//import { task } from './task.model';

interface IWorkflowState {
    ticketId: string;
    workflowId: string;
    tasks: object[];
    isPublished: boolean;
}

const WorkflowStateSchema = new Schema<IWorkflowState>({
    ticketId: {
        type: String,
        required: true
    },
    workflowId: {
        type: String,
        required: true
    },
    tasks: {
        type: Schema.Types.Mixed,
        default: []
    },
    isPublished: {
       type: Boolean,
       default: false
    }
},{timestamps: true})

export const WorkFlowState = model<IWorkflowState>('WorkFlowState', WorkflowStateSchema) 