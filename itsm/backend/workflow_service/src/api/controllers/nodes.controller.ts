import { Request, Response } from "express";
import { WorkFlow } from "../../models/workflow.model";
import { node } from "../../models/node.model";
import { isWorkFlowPublished } from "../../utils/workflow.helper";
import { NodeService } from "../services/nodes.service";

const nodesService = new NodeService()

export async function addTaskToWorkFlow(req: Request, res: Response) {
    try {
      const { taskData, workflowId } = req?.body
      const result = await nodesService.addTaskToWorkFlow(taskData, workflowId)
      console.log('result=========================', result)
      res.status(200).send({
        success: true,
        data: {
          result: result
        },
        error: ""
      })
    } catch (err:any) {
      console.log('err===========================', err)
      res.status(500).send({
        success: false,
        data: "",
        error: err.message
      })
    }
  }
  
  export async function detachTaskFromWorkFlow(req: Request, res: Response) {
    try {
      const { taskId, workflowId } = req?.body
      const isPublished = await isWorkFlowPublished(workflowId)
      if (isPublished) throw new Error('Workflow cannot be modified')
      const workFlow = await WorkFlow.findById(workflowId)
      if (!workFlow) throw new Error('workflow does not exists')
      const tasksList = workFlow.tasks.filter((task: any) => {
        return task._id.toString() !== taskId
      })
      workFlow.tasks = tasksList
      const result = await workFlow.save()
      res.status(200).json({
        success: true,
        data: {
          result: result
        },
        error: ""
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        data: "",
        error: err
      })
    }
  }
  
  export async function getTaskById(req: Request, res: Response) {
    try {
      const taskId: any = req?.query?.taskId
      const workflowId: any = req?.query?.workflowId
      console.log('taskId,workflowId============', taskId, workflowId)
      const result = await node.findOne({ _id: taskId, workflows: workflowId })
      res.status(200).json({
        success: true,
        data: {
          result: result,
          nextStep: 1
        },
        error: ""
      })
    } catch (err) {
      console.log('error=============', err)
      res.status(500).json({
        success: false,
        data: "",
        error: err
      })
    }
  }
  
  export async function deleteTask(req: Request, res: Response) {
    try {
      const { taskId, workFlowId } = req?.body
      const result = await nodesService.deleteTask(workFlowId, taskId)
      res.status(200).json({
        success: true,
        data: {
          result: result
        },
        error: ""
      })
    } catch (err:any) {
      res.status(500).send({
        success: false,
        data: "",
        error: err.message
      })
    }
  }
  
  export async function updateTaskInWorkFlow(req: Request, res: Response) {
    try {
      const { taskId, taskData, workFlowId } = req?.body
      const result = await nodesService.updateTask(workFlowId,taskId,taskData)
      res.status(200).json({
        success: true,
        data: {
          result: result
        },
        error: ""
      })
    } catch (err:any) {
      console.log('error=======================', err)
      res.status(500).send({
        success: false,
        data: "",
        error: err.message
      })
    }
  }
  