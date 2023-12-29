import { errorMessages, successMessages } from '../../src/constants/app-constants';
import { triggerEmailToUser } from '../../src/services/email.services';
//import { mockRequest, mockResponse } from '../mocker';
//import {triggerEmailToUser} from '../../src/services/email.services'
import * as email from "../../src/services/email.services"
jest.mock("../../src/services/email.services")

export const mockResponse = () => {
    const res:any = {};
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
}

export const mockRequest = () => {
    const req:any = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    req.query = jest.fn().mockReturnValue(req);
    return req;
}


describe('send email response to client', () => {
test('should send email', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const body = {
        title:"testing",
        reciepient: "bansi.569@gmail.com",
        body:"PGRpdgogIHN0eWxlPSJtYXJnaW46IDAgYXV0bzsgbWF4LXdpZHRoOiA3MjBweDsgcGFkZGluZzogMzBweCAwOyBmb250LWZhbWlseTogQXJpYWwiCj4KICA8aDM+SGVsbG8sIHJlY2lldmVyPC9oMz4KICA8cD50aGlzIGlzIHlvdXIgY29udGVudDwvcD4KPC9kaXY+",
        templatePayload:{},
        subject:"testing email"
    }
    const response = successMessages.EMAIL_SUCCESSFULLY_SENT
    const spy = jest.spyOn(email,'triggerEmailToUser').mockImplementation(async()=>{
        return successMessages.EMAIL_SUCCESSFULLY_SENT
    })
    const msg = await email.triggerEmailToUser(body)
    expect(spy).toHaveBeenCalled();
    expect(msg).toBe(response)
})

test('failed to send email', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const body = {
        title:"testing",
        reciepient: "bansi.569@gmail.com",
        body:"PGRpdgogIHN0eWxlPSJtYXJnaW46IDAgYXV0bzsgbWF4LXdpZHRoOiA3MjBweDsgcGFkZGluZzogMzBweCAwOyBmb250LWZhbWlseTogQXJpYWwiCj4KICA8aDM+SGVsbG8sIHJlY2lldmVyPC9oMz4KICA8cD50aGlzIGlzIHlvdXIgY29udGVudDwvcD4KPC9kaXY+",
        templatePayload:{},
        subject:"testing email"
    }
    const response = errorMessages.EMAIL_NOT_SENT
    const spy = jest.spyOn(email,'triggerEmailToUser').mockImplementation(async()=>{
        return errorMessages.EMAIL_NOT_SENT
    })
    const msg = await email.triggerEmailToUser(body)
    expect(spy).toHaveBeenCalled();
    expect(msg).toBe(response)
})
})