import { SendEmailInput } from "../types/email.types"
import * as nodemailer from "nodemailer"
import dotenv from "dotenv"
import { errorMessages } from "../constants/app-constants"
import * as ejs from 'ejs'
import { getMainTemplatePath } from "./template"
dotenv.config()

export function createTransporter() {
    try {
        const transporter = nodemailer.createTransport({
            pool: true,
            host: process.env.SMTPHOST,
            port: 25,
            secure: false,
            auth: {
                user: process.env.SMTPUSER,
                pass: process.env.SMTPPASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        return transporter
    } catch (error) {
        throw new Error(errorMessages.NODEMAILER_CREATION_FAILED)
    }
}

export async function sendEmail(payload: SendEmailInput, transporter: any) {
    try {
        const { reciepient, title, subject, templatePayload, cc } = payload
        return new Promise((resolve, reject) => {
            const mainTemplatePath = getMainTemplatePath(reciepient)
            ejs.renderFile(mainTemplatePath, templatePayload, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    const mailOptions = {
                        from: process.env.SMTPFROMADDR,
                        to: reciepient,
                        subject: subject,
                        cc: cc,
                        html: data
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error)
                        }
                        resolve(info)
                    });
                }
            });
        })
    } catch (error) {
        throw error
    }
}
