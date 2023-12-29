import { BadRequestError, CustomError } from "../../errors/index"
import _ from "lodash"
import { Actions } from "../../models/action.model"
import { ErrorConstants } from "../../constants/ErrorConstants"
import { ApiActionErrors } from "../../constants/ErrorConstants/apiAction.error"
import { api } from "../../models/api.model"

const {ActionErrors } = ErrorConstants

export class ApiActionService {
    constructor() {

    }

    async addApiAction(actionId: string, apiData: any) {
        try {
            if (!actionId || !apiData) throw new BadRequestError(ActionErrors.INSUFFICIENT_PAYLOAD, 400, {})

            if (_.isEmpty(apiData)) throw new BadRequestError(ApiActionErrors.ACTION_PAYLOAD_MISSING, 400, {})
            const actionInfo: any = await Actions.findOne({ _id: actionId })
            if(!actionInfo) throw new CustomError(ActionErrors.ACTION_NOT_FOUND, 500 ,{})
            const apiAction: any = await api.create({ ...apiData })
            actionInfo.apis = [...actionInfo.apis, apiAction]
            await actionInfo.save()
            apiAction.actionId = actionId
            await apiAction.save()
            return apiAction
        } catch (error) {
            throw error
        }
    }

    async deleteApiAction(actionId: string, apiActionId: string) {
        try {
            if (!apiActionId || !actionId) throw new BadRequestError(ActionErrors.INSUFFICIENT_PAYLOAD, 500, {})
            const res = await Actions.findOneAndUpdate({ _id: actionId }, {
                $pullAll: {
                    apis: [apiActionId]
                }
            },{
                new: true
            })
            if(!res) throw new CustomError(ApiActionErrors.DELETION_FAILED, 500 ,{})
            await api.updateOne({ _id: apiActionId }, { $set: { isActive: false } })
            return actionId
        } catch (error) {
            throw error
        }
    }

    async editApiAction(apiActionId: string, apiActionPayload: any) {
        try {
            if ( !apiActionId || _.isEmpty(apiActionPayload)) throw new CustomError(ActionErrors.INSUFFICIENT_PAYLOAD,400,{})
            const result = await api.findOneAndUpdate({ _id: apiActionId }, { $set: { ...apiActionPayload } }, { new: true })
            if(!result) throw new CustomError(ApiActionErrors.EDITING_FAILED,500, {})
            return result._id
        } catch (error) {
            throw error
        }
    }

    async getApiActionById(id: string) {
        try {
          const action = await api.findById(id)
          if(!action) throw new CustomError(ActionErrors.ACTION_NOT_FOUND, 500, {})
          return action._id
        } catch (error) {
            throw error
        }
    }

    async getAllApiActions(actionId: string ) {
        try {
          const action = await api.find({actionId:actionId,isActive:true})
          if(!action || _.isEmpty(action)) throw new CustomError(ActionErrors.ACTION_NOT_FOUND, 500, {})
          return action
        } catch (error) {
            throw error
        }
    }

}