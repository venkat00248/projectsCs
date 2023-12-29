import { Request, Response } from "express";
import { ValidationService } from "../services/validations.service";

const validationService = new ValidationService()

export async function addValidationsInWorkflow(req: Request, res: Response) {
    try {
      const { taskId, validationPayload } = req?.body
      const result = validationService.addValidationsInTask(taskId, validationPayload)
      res.status(200).send({
        success: true,
        data: {
          result: result
        },
        error: ""
      })
    } catch (err: any) {
      console.log('error=======================', err)
      res.status(500).json({
        success: false,
        data: "",
        error: err.message
      })
    }
  }
  
  export async function deleteValidationsInWorkflow(req: Request, res: Response) {
    try {
      const { taskId, validationId } = req?.body
      const result = await validationService.deleteValidationsInTask(taskId,validationId)
      res.status(200).json({
        success: true,
        data: {
          result: result
        },
        error: ""
      })
    } catch (err: any) {
      console.log('error=======================', err)
      res.status(500).send({
        success: false,
        data: "",
        error: err.message
      })
    }
  }
  
  export async function updateValidationsInWorkflow(req: Request, res: Response) {
    try {
      const { taskId, validationId, validationPayload } = req?.body
      const result = validationService.editValidationsInTask(taskId,validationId, validationPayload)
      res.status(200).json({
        success: true,
        data: {
          result: result
        },
        error: ""
      })
    } catch (err: any) {
      console.log('error=======================', err)
      res.status(500).send({
        success: false,
        data: "",
        error: err.message
      })
    }
  }
  