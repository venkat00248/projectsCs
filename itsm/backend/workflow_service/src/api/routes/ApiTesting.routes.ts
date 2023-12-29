import { Router } from "express";
import { Request, Response } from "express";
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { BadRequestError, CustomError } from "@errors";
import { ErrorConstants } from "../../constants/ErrorConstants/index"
const { TestApiErrors } = ErrorConstants

const router: Router = Router();
const callingAxios = async ({ httpmethod, sourceurl, body, headers, params }: any) => {
    interface options {
        method: String,
        url: String,
        headers: Object,
        params: Object,
        data: any,
        // formdata:Object
    }
    const options: any = {
        // mode: 'no-cors',
        method: httpmethod,
        url: sourceurl,
        headers: headers,
        params: params,
        data: body,
        // formdata: FormData
    }
        try {
        const res = await axios(options);
        const data = res.data
        return data;
    } catch (error) {
        throw error;
    }
}

const createLogs = async (Type: any, Serivice_name = {}, Payload: any, userID = {}, tenantId = {}, message: any, uuidVal: any = {}, err: any) => {
    const options: any = {
        Type,
        Serivice_name,
        Payload,
        userID,
        tenantId,
        uuid: uuidVal,
        message,
        err

    }
    try {
        let res: any = await axios.post('http://localhost:3002/logger/', options)
        return res
    } catch (err: any) {
        throw err
    }
}


router.post('/postman', async (req: Request, res: Response) => {
    let uuidVal = uuidv4()
    let logError = false
    
    try {
        const contentType = req.get('Content-Type');
        if (contentType === 'application/xml' || contentType === 'text/xml') {
            // parsing xml data 
            let xmlBody = req?.body
            var { httpmethod, sourceurl, body, headers, params }: any = xmlBody.root

            if (!httpmethod && !sourceurl) { throw new BadRequestError(TestApiErrors.METHOD_AND_SOURCE_URL_NOT_GIVEN, 400, {}) }
            else if (!httpmethod) { throw new BadRequestError(TestApiErrors.HTTP_METHOD_NOT_GIVEN, 400, {}) }
            else if (!sourceurl) { throw new BadRequestError(TestApiErrors.SOURCE_URL_NOT_GIVEN, 400, {}) }
            var httpmethod = httpmethod.toString()
            var sourceurl = sourceurl.toString()
        } else {
            var { httpmethod, sourceurl, body, headers, params }: any = req?.body
         }

        createLogs(httpmethod, {}, { sourceurl, body, headers, params }, {}, {}, `${httpmethod ? httpmethod + "request" : "No request is defined"} `, uuidVal, logError)

        if (httpmethod === "" && sourceurl === "") { throw new BadRequestError(TestApiErrors.METHOD_AND_SOURCE_URL_NOT_GIVEN, 400, {}) }
        else if (httpmethod === "") { throw new BadRequestError(TestApiErrors.HTTP_METHOD_NOT_GIVEN, 400, {}) }
        else if (sourceurl === "") { throw new BadRequestError(TestApiErrors.SOURCE_URL_NOT_GIVEN, 400, {}) }
        

        const result: any = await callingAxios({ httpmethod, sourceurl, body, headers, params })
        console.log(result)
        if (!result) { throw new CustomError(TestApiErrors.UNKNOWN_ERROR_OCCURED, 500, {}) }


        //Happens only if result is success
        createLogs(httpmethod, {}, { sourceurl, body, headers, params }, {}, {}, result, uuidVal, logError)

        res.status(200).json({
            success: true,
            data: result,
            error: ""
        })
    }
    catch (err: any) {
        if (err?.response?.data) {
            var error = err?.response?.data
            var status = err?.response?.status
        }
        else {
            // console.log(err , err.message)
            var error = err.message
            var status = err?.code
        }
        res.status(200).json({
            success: true,
            data: {
                err: error,
                status: status,
            },
            error: ""
        })

        //Happens only if result is error   
        createLogs(httpmethod, {}, { sourceurl, body, headers, params }, {}, {}, err, uuidVal, logError = true)

    }
})




export default router;