import { triggerEmailToUser } from "../services/email.services"
import { SendEmailInput } from "../types/email.types"
import { Request, Response } from "express";

export async function sendEmailToUser(req: Request, res: Response) {
    try {
       const reqBody: SendEmailInput = req?.body
       const result = await triggerEmailToUser(reqBody)
       res.status(200).json({
          message:result
       })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}