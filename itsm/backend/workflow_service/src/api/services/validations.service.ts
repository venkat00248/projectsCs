import { BadRequestError, CustomError } from "../../errors/index"
import _ from "lodash"
import { node } from "../../models/node.model"
import { Validations } from "../../models/validation.model"
import { ErrorConstants } from "../../constants/ErrorConstants"

const {ValidationErrors, NodesErrors} = ErrorConstants

export class ValidationService {
    constructor() {

    }

    async addValidationsInTask(taskId: string, validationData: any) {
        try {
            if (!taskId || !validationData ) throw new BadRequestError(ValidationErrors.INSUFFICIENT_PAYLOAD, 400, {})
            if(_.isEmpty(validationData)) throw new BadRequestError(ValidationErrors.VALIDATION_PAYLOAD_MISSING, 500, {}) 
            const taskInfo: any = await node.findOne({ _id: taskId })
            if(!taskInfo) throw new CustomError(NodesErrors.TASK_NOT_FOUND, 500 ,{})
            const validation: any = await Validations.create({ ...validationData })
            taskInfo.validations = [...taskInfo.validations, validation]
            await taskInfo.save()
            validation.taskId = taskId
            await validation.save()
        } catch (error) {
            throw error
        }
    }

    async editValidationsInTask(taskId: string, validationId: string, validationPayload: any) {
        try {
            if (!taskId || !validationId) throw new BadRequestError(ValidationErrors.INSUFFICIENT_PAYLOAD, 400, {})
            if(_.isEmpty(validationPayload)) throw new BadRequestError(ValidationErrors.VALIDATION_PAYLOAD_MISSING, 500, {}) 
            const result = await Validations.findOneAndUpdate({ _id: validationId, taskId: taskId }, { $set: { ...validationPayload } }, { new: true })
            if (!result) throw new CustomError(ValidationErrors.EDITING_FAILED, 500, {})
            return result._id
        } catch (error) {
            throw error
        }
    }

    async deleteValidationsInTask(taskId: string, validationId: string) {
        try {
            if (!taskId || !validationId) throw new BadRequestError(ValidationErrors.INSUFFICIENT_PAYLOAD, 500, {})
            await node.updateOne({ _id: taskId }, {
                $pull: {
                    validations: { _id: validationId }
                }
            })
            const deletedValidation = await Validations.updateOne({ _id: validationId }, { $set: { isActive: false } })
            return deletedValidation
        } catch (error) {
            throw error
        }
    }
}