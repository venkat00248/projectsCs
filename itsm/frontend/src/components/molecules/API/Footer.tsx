import React, { useEffect } from 'react'
import './Footer.scss'
import { useFormData } from './context/FormDataProvider';
import { WorkFlowService } from '../../../services/WorkFlowService';
// import json-beautify from {'json-beautify'}
export const Footer = ({ onFirstButtonClick }: any) => {
  const { url, setResponse, response, setSuccessMsg ,method, queryParams, headers, err, setErr, setDisbaled, disabled, postFormData, authValues, body ,actionId} = useFormData();


  // let data = body.toString()
  // console.log(data, "body")
  const makingObjects = async (dataArr: any) => {
    let obj = {}
    dataArr.forEach((item: any, index: any) => {
      if (dataArr[index].key != "" && dataArr[index].value != "") {
        obj = { ...obj, [item.key]: item.value }
      }
    })
    return obj
  }


  const saveApi = async () => {

    //need actionId, apiData
    const data = {
      actionId: actionId,
      apiData: {
        "description": "",
        "method": method,
        "url": url,
        "body": body ? body.toString() : "",
        "queryParams": JSON.stringify(queryParams),
        "params": "",
        // "actionId":
      }
    }
    const result: any = await WorkFlowService.saveApi(data)
    if(result.status===200){
      setSuccessMsg("API Saved Sucessfully")
    }
    console.log( "result from save api after creating an document.",result)
  }

  const enableSaveAPI = (bool: boolean) => {
    setDisbaled((prev: any) => ({
      ...prev, save: bool
    }));
  }


  const checkAuth = async () => {
    if (authValues.bearer) {
      console.log(authValues.bearer, "bearer token")
      return `Bearer ${authValues.bearer}`
    }
    if (authValues.username || authValues.password) {
      const base64Credentials = btoa(`${authValues.username}:${authValues.password}`);
      return `Basic ${base64Credentials}`
    }
    else {
      return null
    }
  }

  const apiHandler = async () => {
    setResponse("")
    // let data:any = JSON.parse(requestBody);
    let auth = await checkAuth()
    console.log(auth, 
      'authvalues')
    try {
      let headersObj = await makingObjects(headers)
      let paramsObj = await makingObjects(queryParams)
      let formDataObj = await makingObjects(postFormData)
      const data: any = {
        "httpmethod": method,
        "sourceurl": url,
        "body": body !== '{\n\t\n}' ? body.toString() : "",
        "headers": {
          ...headersObj, 'Content-Type': 'application/*', "accept": "*/*",
          "Authorization": auth
        },
        "params": paramsObj,
        // "form-data":formDataObj
      }
      console.log(data, "datadatadatadatadat")
      const res: any = await WorkFlowService.configApi(data)
      if (url.includes('localhost')) {
        if (res.data.data.data.result) {
          let result: any = res.data.data.data.result
          setResponse(result)
          enableSaveAPI(false)
          // await saveApi(data,result)
        } else {
          setResponse(res.data.data)
          enableSaveAPI(true)
        }
      }
      else {
        let result: any = res.data.data
        setResponse(result)
        if (!res.data.data.error) {
          enableSaveAPI(false)
          // await saveApi(data,result)
        } else {
          setResponse(res.data.data.error)
          enableSaveAPI(true)
        }
      }

    }
    catch (error: any) {
      console.log("error while Deleting node", error);
    }
  }


  useEffect(() => {
    enableSaveAPI(true)
    if (url === "" || method === "") {
      setDisbaled((prev: any) => ({
        ...prev, test: true
      }));
    } else {
      setDisbaled((prev: any) => ({
        ...prev, test: false
      }));
    }
  }, [url, method, headers]);


  return (
    <div className="apifooter fixed-bottom">
      <div className="d-flex justify-content-between">
        <div className="footerleft">
          <button type="button"
            className="btn btn-primary btn-sm"
            onClick={apiHandler}
            disabled={disabled.test}
          >
            Test
          </button>
        </div>

        <div className="footerright">
          <button type="button" className="btn btn-success btn-sm me-2" onClick={saveApi} disabled={disabled.save}>Save</button>
          <button type="button" className="btn btn-danger btn-sm">Cancel</button>
        </div>
      </div>
    </div>
  )
}
