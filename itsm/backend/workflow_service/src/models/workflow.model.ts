import { Schema, model } from 'mongoose'
//import { ITask } from './task.model';
/*import { task } from './task.model';
task.schema*/
import { node } from './node.model';
node.schema

enum Priorities {
  HIGH ='p1',
  MEDIUM = 'p2',
  LOW = 'p3'
}

export interface IWorkFlow {
    wf: string;
    created_by: string;
    ticket_type_id: string;
    name: string;
    description: string;
    is_active: boolean;
    is_published: boolean;
    tasks: object[];
    priority: Priorities;
}

const WorkFlowSchema = new Schema<IWorkFlow>({
    wf: {
        type: String,
        default: ""
    },
    created_by: {
        type: String,
      },
      ticket_type_id: {
        type: String
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      is_active: {
        type: Boolean,
        default: false
      },
      priority: {
        type: String,
        required: true,
        default: Priorities.HIGH
      },
      is_published: {
        type: Boolean,
        default: false
      },
      tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Node'
    }]
},{timestamps: true})

export const WorkFlow = model<IWorkFlow>('WorkFlow', WorkFlowSchema) 