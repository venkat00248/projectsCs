import { errorMessages, successMessages } from "../../src/constants/app-constants";
import { triggerEmailToUser } from "../../src/services/email.services";
/*import * as nodemailer from "../../src/utils/nodemailer";
import * as template from "../../src/utils/template"
jest.mock("../../src/utils/nodemailer.ts")
jest.mock("../../src/utils/template.ts")*/


test('should trigger email with nodemailer', async () => {
    const data = {
        title:"testing",
        reciepient: "bansi.569@gmail.com",
        body:"PGRpdgogIHN0eWxlPSJtYXJnaW46IDAgYXV0bzsgbWF4LXdpZHRoOiA3MjBweDsgcGFkZGluZzogMzBweCAwOyBmb250LWZhbWlseTogQXJpYWwiCj4KICA8aDM+SGVsbG8sIHJlY2lldmVyPC9oMz4KICA8cD50aGlzIGlzIHlvdXIgY29udGVudDwvcD4KPC9kaXY+",
        templatePayload:{},
        subject:"testing email"
    }
    const response = successMessages.EMAIL_SUCCESSFULLY_SENT
    const msg = await triggerEmailToUser(data)
    expect(msg).toBe(response)
})

test('should not send email on empty recipient field and throw exception',async()=>{
    const data = {
        title:"testing",
        reciepient: "",
        body:"PGRpdgogIHN0eWxlPSJtYXJnaW46IDAgYXV0bzsgbWF4LXdpZHRoOiA3MjBweDsgcGFkZGluZzogMzBweCAwOyBmb250LWZhbWlseTogQXJpYWwiCj4KICA8aDM+SGVsbG8sIHJlY2lldmVyPC9oMz4KICA8cD50aGlzIGlzIHlvdXIgY29udGVudDwvcD4KPC9kaXY+",
        templatePayload:{},
        subject:"testing email"
    }
    const msg = await triggerEmailToUser(data).catch(err => {
        expect(err).toBeInstanceOf(Error)
        expect(err.message).toBe(errorMessages.USER_ID_MISSING)
    })
})