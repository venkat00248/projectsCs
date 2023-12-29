import { ActionService } from "../services/actions.service";
import { Request, Response } from "express";

const actionService = new ActionService()

export async function addActionsInWorkflow(req: Request, res: Response) {
    try {
        console.log("req from Save-------------------", req.body)

        const { taskId, actionData } = req?.body
        const result = await actionService.addActionInTask( taskId, actionData)
        res.status(200).json({
            success: true,
            data: {
                result: result
            },
            error: ""
        })
        console.log("result from Save-------------------", result)
    } catch (error: any) {
        res.status(500).json({
            success: false,
            data: "",
            error: error.message
        })
    }
}

export async function editActionsInWorkflow(req: Request, res: Response) {
    try {
        const { taskId, actionId, actionPayload } = req?.body
        const result = await actionService.editActionInTask(taskId, actionId, actionPayload)
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

export async function deleteActionsInWorkflow(req: Request, res: Response) {
    try {
        const { taskId, actionId } = req?.body
        const result = actionService.deleteActionFromTask(taskId, actionId)
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

export async function fetchActionById(req: Request, res: Response) {
    try {
        const { id } = req.params
        const result = await actionService.getActionById(id)
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