import { errorMessages, successMessages } from "../constants/app-constants"
import { SendEmailInput } from "../types/email.types"
import { createTransporter, sendEmail } from "../utils/nodemailer"
import { getMainTemplatePath, makeEmailTemplate } from "../utils/template"
import * as fs from 'fs/promises'

export async function triggerEmailToUser(payload: SendEmailInput) {
    try {
        if(!payload?.reciepient) throw new Error(errorMessages.USER_ID_MISSING)
        const transporter = createTransporter()
        await makeEmailTemplate(payload?.body,payload?.reciepient)
        const info: any = await sendEmail(payload, transporter )
        return info && info?.response ? successMessages.EMAIL_SUCCESSFULLY_SENT : errorMessages.EMAIL_NOT_SENT
    } catch (error) {
        throw error
    } finally {
         const mainTemplatePath = getMainTemplatePath(payload?.reciepient)
         fs.unlink(mainTemplatePath)
    }
}