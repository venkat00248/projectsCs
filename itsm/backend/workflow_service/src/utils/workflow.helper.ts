import { WorkFlow } from "../models/workflow.model"
import { Actions } from "../models/action.model"
import { createTransporter, sendEmail } from "./nodemailer"
import moment from 'moment'
//import axios from 'axios'
import { api } from "../models/api.model"
import { KafkaProducer } from "./kafka-publisher"

const workJson = { name: "TSK Workflow", steps: [{ id: 1, name: "Step 1: Open", description: "This is the first step in the workflow.", type: "task", target: [2] }, { id: 2, name: "Step 2: InProgress", description: "This is the second step in the workflow.", type: "task", target: [3], source: [2] }, { id: 3, name: "Step 3", description: "This is the second step in the workflow.", type: "decision", options: [{ name: "Option 1", target: [4] }, { name: "Option 2", target: [5] }] }, { id: 4, name: "Step 4", description: "This is the third step in the workflow.", type: "task", target: [6] }, { id: 5, name: "Step 5", description: "This is the fourth step in the workflow.", type: "task", target: [6] }, { id: 6, name: "Step 6", description: "This is the final step in the workflow.", type: "end" }] }
  
  export function getNextTask(nextStep:number){
    try{
    const res = workJson?.steps?.filter(step=> step.id === nextStep)
    if(!res || !res.length) throw new Error('cannot fetch next task')
    return res[0]
    } catch(err){
      throw err
    }
  }

  export function getPrevTask(step:Number) {
    const res = workJson?.steps?.filter(item=>item.id === step)
    if(!res[0].source|| res[0].source.length===0) throw new Error('previous task cannot be reached')
    const prevId = res[0].source
    return workJson?.steps?.filter(item=>item.id===prevId[0])
  }

  export function upsertTaskInWorkflow(data:any, taskId: number, taskProperties:any) {
   try{
     const tasksList = data?.tasks?.map((task: any)=>{
      if(task.id===taskId){
        return {...task,taskProperties}
      } else {
        return task
      }
     })
     return tasksList
   }catch(err){
    console.log(err)
    throw err
   }
  }

  export function updateTaskInWorkflow(data:any, taskId: number, taskProperties:any){
    try{
      const tasksList = data?.tasks?.map((task: any)=>{
        if(task._id.toString()===taskId){
          return {...task,taskProperties}
        } else {
          return task
        }
       })
       return tasksList
    } catch(err){
      throw err
    }
  }

  const actionsConfig:any = {
    email: async(template:any,properties:any,totalTime:number,sourceNodeName:string,targetNodeName:string,priority:string)=>{
         try{
          console.log('properties',properties)
          const transporter = createTransporter()
          const result = await sendEmail({reciepient:properties.email, subject:properties?.subject||'test email', text:`task completed in ${totalTime || 0} minutes`,sourceNodeName,targetNodeName,priority,totalTime},transporter,template)
          return result
         } catch(err){
          console.log('err in email=====================',err)
          throw err
         }
    },
    pushNotifications: async(properties:any,totalTime:number)=>{
      console.log('sent push notification',properties,totalTime)
      return "pushnotification"
    }
  }

  const validationsConfig:any = {
    'artifacts': async(payload:any)=>{
       return payload.data==='artifact' ? true : false
    }
  }

  export async function runActions(actions:any,template:any,totalTime:number,sourceNodeName:string,targetNodeName:string,priority:string){
    try{
       if(!actions || !actions.length) return
       console.log('actions====================',actions)
      const actionArr =  actions.map(async(actionId: any)=>{
          const action:any = await Actions.findById(actionId)
          return action?.type==="email"?actionsConfig[action.type](template,action.payload,totalTime,sourceNodeName,targetNodeName,priority) : excecuteApiAction(action)
       })
       console.log('actionArr=========================',actionArr)
       await Promise.all(actionArr)
       return
    }catch(error){
      throw error
    }
  }

  async function excecuteApiAction(action:any) {
    if(!action || !Array.isArray(action?.apis)) {
      return
    }
    const {apis} = action
    const apiActions = []
    for(let i=0;i<apis.length;i++){
      const apiAction = await api.findById(apis[i])
      apiActions.push(apiAction)
    }
    const kafka = KafkaProducer.getInstance()
    kafka.sendMessage(apiActions)
    return
  }

  export async function runValidations(validations:any){
    try{
       if(!validations || validations.length === 0) return true
       for(const validation of validations){
        const res = await validationsConfig[validation.type](validation.payload)
        if(!res) throw new Error(`${validation.type} validation failed`)
       }
       return true
    }catch(error){
      throw error
    }
  }

export async function isWorkFlowPublished(workFlowId: any) {
    const flow = await WorkFlow.findById(workFlowId)
    if (!flow) throw new Error('workflow not found')
    return flow.is_published
  }

  export function computeTimeCompletion(timeLogs:any) {
    try{
      const sortTimes = timeLogs.sort((t1:any,t2:any)=>{
        return t2.startTime-t1.startTime
      })
      const totalTime = sortTimes.reduce((acc:any,cur:any)=>{
        let startTime = moment(new Date(cur.startTime))
        let endTime = moment(new Date(cur.endTime))
        let duration = moment.duration(endTime.diff(startTime))
        return acc+ duration.asMinutes()
      },0)
      return Math.ceil(totalTime)
    }catch(err){
      throw err
    }

  }