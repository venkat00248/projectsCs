import * as ejs from 'ejs'
import { errorMessages } from '../constants/app-constants'
import path from 'path'
import * as fs from 'fs/promises'

export const mainTemplateBasePath = path.join(__dirname,"../../../src/public/views")

export function getMainTemplatePath(reciepient: string) {
    return path.join(mainTemplateBasePath,`/${reciepient}_main.ejs`)
}

export async function makeEmailTemplate(body: string, reciepient: string) {
    try {
      const mainTemplatePath = getMainTemplatePath(reciepient)
      const headerTemplatePath = path.join(__dirname,"../../../src/public/views/partials/header.ejs")
      const footerTemplatePath = path.join(__dirname,"../../../src/public/views/partials/footer.ejs")
      const headerContent = await fs.readFile(headerTemplatePath,'utf-8')
      const footerContent = await fs.readFile(footerTemplatePath,'utf-8')
      await fs.writeFile(mainTemplatePath,headerContent)
      await fs.appendFile(mainTemplatePath,atob(body))
      await fs.appendFile(mainTemplatePath,footerContent)
      return
    } catch (err) {
        throw new Error(errorMessages.TEMPLATE_CREATION_FAILED)
    }
}
