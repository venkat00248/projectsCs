import * as nodemailer from "nodemailer"
import dotenv from "dotenv"
import * as ejs from 'ejs'
import path from 'path'
dotenv.config()

export const mainTemplateBasePath = path.join(__dirname, "../../../../src/public/views/main.ejs");

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
        console.log('eeror in creation===============================',error)
        throw new Error('NODEMAILER_CREATION_FAILED')
    }
}


/*export async function sendEmail(payload: any, transporter: any) {
    try {
        const { reciepient, subject, text } = payload
        console.log('payload in send email====================',reciepient,subject,text)
        return new Promise((resolve, reject) => {
                    const mailOptions = {
                        from: process.env.SMTPFROMADDR,
                        to: reciepient,
                        subject: subject,
                        text: text
                    };

                    transporter.sendMail(mailOptions, (error: any, info: unknown) => {
                        if (error) {
                            console.log('error in sending=============================',error)
                            reject(error)
                        }
                        resolve(info)
                    });
            
        })
    } catch (error) {
        throw error
    }
}*/

export async function sendEmail(payload: any , transporter: any, templatePath:any) {
    try {
        const { reciepient, subject, text,sourceNodeName,targetNodeName,priority,totalTime } = payload
        console.log('text=====================',text,sourceNodeName,targetNodeName)
        return new Promise((resolve, reject) => {
            //const mainTemplatePath = getMainTemplatePath(reciepient)
            ejs.renderFile(templatePath, {sourceNodeName,targetNodeName,priority,totalTime}, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    const mailOptions = {
                        from: process.env.SMTPFROMADDR,
                        to: reciepient,
                        subject: subject,
                        html: data
                    };

                    transporter.sendMail(mailOptions, (error: any, info: any) => {
                        if (error) {
                            reject(error)
                        }
                        resolve(info)
                    });
                }
            });
        })
    } catch (error) {
        console.log('error in sending mail========================',error)
        throw error
    }
}