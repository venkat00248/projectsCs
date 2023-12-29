import { BadRequestError, CustomError } from "../../errors/index"
import _ from "lodash"
import { Actions } from "../../models/action.model"
import { node } from "../../models/node.model"
import { ErrorConstants } from "../../constants/ErrorConstants"

const {ActionErrors, NodesErrors} = ErrorConstants

export class ActionService {
    constructor() {

    }

    async addActionInTask( taskId: string, actionData: any) {
        try {
            if (!taskId ) throw new BadRequestError(ActionErrors.INSUFFICIENT_PAYLOAD, 400, {})
            if (_.isEmpty(actionData)) throw new BadRequestError(ActionErrors.ACTION_PAYLOAD_MISSING, 400, {})
            const taskInfo: any = await node.findOne({ _id: taskId })
            if(!taskInfo) throw new CustomError(NodesErrors.TASK_NOT_FOUND, 500 ,{})
            const action: any = await Actions.create({ ...actionData })
            taskInfo.actions = [...taskInfo.actions, action]
            await taskInfo.save()
            action.taskId = taskId
            await action.save()
            return action
        } catch (error) {
            throw error
        }
    }

    async deleteActionFromTask(taskId: string, actionId: string) {
        try {
            if (!taskId || !actionId) throw new BadRequestError(ActionErrors.INSUFFICIENT_PAYLOAD, 500, {})
            const res = await node.findOneAndUpdate({ _id: taskId }, {
                $pullAll: {
                    actions: [actionId]
                }
            },{
                new: true
            })
            if(!res) throw new CustomError(NodesErrors.ACTION_REMOVAL_FAILED, 500 ,{})
            await Actions.updateOne({ _id: actionId }, { $set: { isActive: false } })
            return actionId
        } catch (error) {
            throw error
        }
    }

    async editActionInTask(taskId: string, actionId: string, actionPayload: any) {
        try {
            if (!taskId || !actionId || _.isEmpty(actionPayload)) throw new CustomError(ActionErrors.INSUFFICIENT_PAYLOAD,400,{})
            const result = await Actions.findOneAndUpdate({ _id: actionId,taskId:taskId }, { $set: { ...actionPayload } }, { new: true })
            if(!result) throw new CustomError(ActionErrors.EDITING_FAILED,500, {})
            return result._id
        } catch (error) {
            throw error
        }
    }

    async getActionById(actionId: string):Promise<any> {
        try {
          const action = await Actions.findById(actionId).populate('apis')
          if(!action) throw new CustomError(ActionErrors.ACTION_NOT_FOUND, 500, {})
          return action
        } catch (error) {
            throw error
        }
    }
}