import { Request, Response } from "express";
import { ApiActionService } from "../services/api.action";

const actionService = new ApiActionService()

export async function addApiIntegrationInAction(req: Request, res: Response) {
    try {
        const { actionId, apiData } = req?.body
        const result = await actionService.addApiAction(actionId, apiData)
        res.status(200).json({
            success: true,
            data: {
                result: result
            },
            error: ""
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            data: "",
            error: error.message
        })
    }
}

export async function editApiIntegrationAction(req: Request, res: Response) {
    try {
        const { actionId, actionPayload } = req?.body
        const result = await actionService.editApiAction(actionId,actionPayload)
        res.status(200).json({
            success: true,
            data: {
                result: result
            },
            error: ""
        })

    } catch (error: any) {
        res.status(500).send({
            success: false,
            data: "",
            error: error.message
        })
    }
}

export async function deleteApiIntegrationAction(req: Request, res: Response) {
    try {
        const { apiActionId, actionId } = req?.body
        const result = actionService.deleteApiAction(actionId,apiActionId)
        res.status(200).json({
            success: true,
            data: {
                result: result
            },
            error: ""
        })
    } catch (error: any) {
        res.status(500).send({
            success: false,
            data: "",
            error: error.message
        })
    }
}

export async function fetchAllApiIntegrations(req: Request, res: Response) {
    try {
        const {id} = req?.params
        const result = await actionService.getAllApiActions(id)
        res.status(200).json({
            success: true,
            data: {
                result: result
            },
            error: ""
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            data: "",
            error: error.message
        })
    }
}

export async function fetchApiActionById(req: Request, res: Response) {
    try {
        const { id } = req.params
        const result = await actionService.getApiActionById(id)
        res.status(200).json({
            success: true,
            data: {
                result: result
            },
            error: ""
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            data: "",
            error: error.message
        })
    }
}