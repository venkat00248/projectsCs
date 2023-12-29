import  CustomError from "../../errors/CustomError"
import { Actions } from "../../models/action.model"
import { node } from "../../models/node.model"
import { Validations } from "../../models/validation.model"
import { WorkFlow } from "../../models/workflow.model"
import { isWorkFlowPublished } from "../../utils/workflow.helper"
import { ErrorConstants } from "../../constants/ErrorConstants"
import _ from "lodash"
//import mongoose from "mongoose"
const {NodesErrors, WorkFlowErrors} = ErrorConstants

export class NodeService {
    constructor() {

    }

    async addTaskToWorkFlow(taskData: any, workFlowId: string) {
        try {
            if (!taskData.actions || !taskData.validations) throw new CustomError(NodesErrors.MISSING_PARAMS, 500, {})
            const isPublished = await isWorkFlowPublished(workFlowId)
            if (isPublished) throw new CustomError(WorkFlowErrors.WORKFLOW_MODIFICATION, 500, {})
            const workFlow = await WorkFlow.findById(workFlowId)
            if (!workFlow) throw new CustomError(WorkFlowErrors.WORKFLOW_NOT_FOUND, 500, {})
            ////beforeActions need to be destructured
            let { actions, validations, ...rest } = taskData
            const nodeInfo: any = await node.create({ ...rest })
            if (actions.length > 0) {
                for (let i = 0; i < actions.length; i++) {
                    const act: any = await Actions.create({ ...actions[i] })
                    nodeInfo.actions = [...nodeInfo.actions, act]
                    act.taskId = nodeInfo._id
                    await act.save()
                }
            }
            //disabling as before actions is not yet integrated on FE
            /*if (beforeActions.length > 0) {
                for (let i = 0; i < actions.length; i++) {
                    const act: any = await Actions.create({ ...actions[i] })
                    nodeInfo.beforeActions = [...nodeInfo.beforeActions, act]
                    act.taskId = nodeInfo._id
                    await act.save()
                }
            }*/
            
            if (validations.length > 0) {
                for (let i = 0; i < validations.length; i++) {
                    const validation: any = await Validations.create({ ...validations[i] })
                    nodeInfo.validations = [...nodeInfo.validations, validation]
                    validation.taskId = nodeInfo._id
                    await validation.save()
                }
            }
            nodeInfo.workflowId = workFlowId
            nodeInfo.timeLogs = []
            workFlow.tasks.push(nodeInfo)
            await workFlow.save()
            const result = await nodeInfo.save()
            return result
        } catch (error) {
            throw error
        }
    }

    async deleteTask(workFlowId: string, taskId: string) {
        try {
            const isPublished = await isWorkFlowPublished(workFlowId)
            if (isPublished) throw new CustomError(WorkFlowErrors.WORKFLOW_MODIFICATION, 500, {})
            const workFlow = await WorkFlow.findById(workFlowId)
            if (!workFlow) throw new CustomError(WorkFlowErrors.WORKFLOW_NOT_FOUND, 500, {})
            const result = await node.deleteOne({ _id: taskId, workflowId: workFlowId })
            await WorkFlow.findOneAndUpdate({ _id: workFlowId }, {
                $pullAll: {
                    tasks: [taskId]
                }
            },{
                new: true
            })
            return result
        } catch (error) {
           throw error
        }
    }

    async updateTask(workFlowId: string,taskId: string, taskData: any) {
        try{
            const isPublished = await isWorkFlowPublished(workFlowId)
            if(taskData && taskData.actions) throw new CustomError('actions cannot be updated', 500 ,{})
            if (isPublished) throw new CustomError(WorkFlowErrors.WORKFLOW_MODIFICATION, 500 ,{})
            if (!taskId || _.isEmpty(taskData) || !workFlowId) throw new CustomError(NodesErrors.INSUFFICIENT_PAYLOAD,500,{})
            const result = await node.findOneAndUpdate({ _id: taskId, workflowId: workFlowId, }, { $set: { ...taskData } }, { new: true })
            if(!result) throw new CustomError(NodesErrors.TASK_NOT_MODIFIED,500,{})
            return result
        } catch(error){
            throw error
        }
    }

    async getTaskById(taskId: string) {
        try{
          const taskInfo = await node.findById(taskId).populate({
            path: "actions"
          }).populate({
            path:"validations"
          })
          if(!taskInfo) throw new CustomError(NodesErrors.TASK_NOT_FOUND,500,{})
        } catch(error){
            throw error
        }
    }
}