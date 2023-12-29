import { WorkFlow } from "../../models/workflow.model"
import { BadRequestError, CustomError } from "../../errors/index"
import { ErrorCodes } from "../../constants/errorCodes"
import _ from "lodash"
import { computeTimeCompletion, isWorkFlowPublished, runActions, runValidations } from "../../utils/workflow.helper"
import { node } from "../../models/node.model"
import { WorkFlowState } from "../../models/state.model"
import { ErrorConstants } from "../../constants/ErrorConstants/index"
import { ServiceCommunication } from "../../utils/interServiceApiCall"
//import { TimeHistory } from "../../models/timeHistory.model"
import path from "path"

const afterTemplatePath = path.join('../../../../../src/public/views/main.ejs')
//const beforeTemplatePath = path.join('../../../../../src/public/views/template.ejs')

const { WorkFlowErrors, NodesErrors } = ErrorConstants

type RunActionPayload = {
    targetNodeName: string,
    sourceNodeName: string,
    nodeId: string,
    workFlowPriority: string
}

export async function deleteWorkFlow(workFlowId: string) {
    try {
        if (!workFlowId) throw new BadRequestError(WorkFlowErrors.WORKFLOW_ID_MISSING, 400, {})
        let workFlow = await WorkFlow.findById(workFlowId)
        if (!workFlow) throw new CustomError(WorkFlowErrors.WORKFLOW_NOT_FOUND, 500, {})
        workFlow.is_active = false
        const result = await workFlow.save()
        return result._id
    } catch (error) {
        throw error
    }
}

export async function fetchAllWorkflows() {
    try {
        const workFlows = WorkFlow.find({})
        if (_.isEmpty(workFlows)) throw new CustomError(WorkFlowErrors.WORKFLOW_NOT_FOUND, 500, {})
        return workFlows
    } catch (error) {
        throw error
    }
}

export async function editWorkFlow(workFlowId: string, editPayload: any) {
    try {
        if (_.isEmpty(editPayload)) throw new BadRequestError(WorkFlowErrors.EDIT_PAYLOAD_MISSING, ErrorCodes.BAD_REQUEST, {})
        if (await isWorkFlowPublished(workFlowId)) throw new CustomError(WorkFlowErrors.WORKFLOW_MODIFICATION, 500, {})
        const result = await WorkFlow.findOneAndUpdate({ _id: workFlowId }, { $set: { ...editPayload } }, { new: true })
        if (!result) throw new CustomError(WorkFlowErrors.EDITING_FAILED, 500, {})
        return result
    } catch (error) {
        throw error
    }
}

export async function saveWorkflow(workFlowId: string, workFlowJson: string) {
    try {
        if (_.isEmpty(workFlowJson)) throw new BadRequestError(WorkFlowErrors.WORKFLOW_JSON_MISSING, ErrorCodes.BAD_REQUEST, {})
        const workFlow = await WorkFlow.findById(workFlowId)
        if (!workFlow) throw new CustomError(WorkFlowErrors.WORKFLOW_NOT_FOUND, ErrorCodes.INTERNAL_SERVER_ERROR, {})
        if (await isWorkFlowPublished(workFlowId)) throw new CustomError(WorkFlowErrors.WORKFLOW_MODIFICATION, 500, {})
        workFlow.wf = JSON.stringify(workFlowJson)
        const result = await workFlow.save()
        return result._id
    } catch (error) {
        throw error
    }
}

export async function getWorkFlowById(workFlowId: string) {
    try {
        const workFlow = await WorkFlow.findById(workFlowId).populate({
            path: "tasks",
            populate: ["actions", "validations"]
        })
        if (!workFlow) throw new CustomError(WorkFlowErrors.WORKFLOW_NOT_FOUND, 500, {})
        return workFlow
    } catch (error) {
        throw error
    }
}

export async function publishWorkFlow(workFlowId: string) {
    try {
        let flow: any = await WorkFlow.findById(workFlowId)
        if (!flow) throw new CustomError(WorkFlowErrors.WORKFLOW_NOT_FOUND, 500, {})
        if (flow.is_published) throw new CustomError(WorkFlowErrors.WORKFLOW_MODIFICATION, 500, {})
        if (!flow.wf || _.isEmpty(JSON.parse(flow.wf))) throw new CustomError(WorkFlowErrors.WOKFLOW_SAVE_ERROR, 500, {})
        const { edges } = JSON.parse(flow.wf)
        //update node target and source fields
        for (let i = 0; i < edges.length; i++) {
            const updatedResult = await node.findOneAndUpdate({ workflowId: workFlowId, id: edges[i].source }, { $push: { "target": edges[i].target } }, { new: true })
            if (!updatedResult) throw new CustomError(WorkFlowErrors.SOURCE_TARGET_MAPPING_ERROR, 500, {})
        }
        flow.is_published = true
        const result = await flow.save()
        return result
    } catch (error) {
        throw error
    }
}

export async function setInitialWorkflowState(ticketId: string, workFlowId: string) {
    try {
        if (!ticketId || !workFlowId) throw new BadRequestError(WorkFlowErrors.BAD_REQUEST_ERROR, 400, {})
        const state = await WorkFlowState.create({
            ticketId: ticketId,
            workflowId: workFlowId,
            isPublished: true
        })
        const nodes: any = await node.find({ workflowId: workFlowId })
        if (!nodes || _.isEmpty(nodes)) throw new CustomError(NodesErrors.TASK_NOT_FOUND, 500, {})
        //filter out start node
        const startNode: any = nodes.filter((taskDet: any) => {
            return taskDet.isStart
        })
        if (!startNode || _.isEmpty(startNode)) throw new CustomError(WorkFlowErrors.START_TASK_ERROR, 500, {})
        const startTime = new Date().toJSON()
        startNode[0].timeLogs = [...startNode[0].timeLogs, { startTime: startTime, createdAt: startTime, endTime: null }]
        state.tasks = [...state.tasks, startNode[0]]
        await state.save()
        const serviceCall = new ServiceCommunication()
        await serviceCall.sendStatusUpdate(ticketId, { statusId: startNode[0]._id || "", name: startNode[0].name || "" })
    } catch (error) {
        throw error
    }
}

export async function traceWorkFlow(ticketId: string, workFlowId: string, sourceNodeId: string, targetNodeId: string) {
    try {
        if (!ticketId || !workFlowId || !sourceNodeId || !targetNodeId) throw new BadRequestError(WorkFlowErrors.BAD_REQUEST_ERROR, 500, {})
        if (sourceNodeId === targetNodeId) throw new CustomError(`${WorkFlowErrors.STATE_TRANSITION_ERROR}_samestate`, 500, {})
        const flow = await WorkFlow.findById(workFlowId)
        if (!flow) throw new CustomError(WorkFlowErrors.WORKFLOW_NOT_FOUND, 500, {})
        const sourceNode: any = await fetchNodeByWorkFlowId(workFlowId, sourceNodeId)
        const targetNode: any = await fetchNodeByWorkFlowId(workFlowId, targetNodeId)
        if (!sourceNode || _.isEmpty(sourceNode)) throw new CustomError(NodesErrors.SOURCE_NODE_NOT_FOUND, 500, {})
        if (!targetNode || _.isEmpty(targetNode)) throw new CustomError(NodesErrors.TARGET_NODE_NOT_FOUND, 500, {})
        if (!Array.isArray(sourceNode?.target) && !sourceNode.target.includes(targetNode.id)) throw new CustomError(WorkFlowErrors.STATE_TRANSITION_ERROR, 500, {})
        const validations = sourceNode?.validations
        await runValidations(validations)
        await WorkFlowState.updateOne({ workflowId: workFlowId, ["tasks._id"]: sourceNode._id }, { $set: { "tasks.$.timeLogs.$[log].endTime": new Date().toJSON() } }, { arrayFilters: [{ "log.endTime": null }] })
        let workFlowState: any = await WorkFlowState.findOne({ ticketId: ticketId, workflowId: workFlowId })
        if (!workFlowState) throw new Error('Workflow not found')
        targetNode.timeLogs = [...targetNode.timeLogs, { startTime: new Date().toJSON(), createdAt: new Date().toJSON(), endTime: targetNode?.isEnd ? new Date().toJSON() : null }]
        workFlowState.tasks = [...workFlowState.tasks, targetNode]
        await workFlowState.save()
        const serviceCall = new ServiceCommunication()
        await serviceCall.sendStatusUpdate(ticketId, { statusId: targetNode._id || "", name: targetNode.name || "" })
        const actions = sourceNode?.actions
        //const targetActions = targetNode?.beforeActions
        //await runActions(targetActions,beforeTemplatePath,0,"","","")
        await excecuteActionsInTask(afterTemplatePath, workFlowState, actions, {
            sourceNodeName: sourceNode?.name,
            targetNodeName: targetNode?.name,
            nodeId: sourceNodeId,
            workFlowPriority: flow?.priority
        })
        if (targetNode?.isEnd) {
            const targetNodeActions = targetNode?.actions
            await excecuteActionsInTask(afterTemplatePath, workFlowState, targetNodeActions, {
                sourceNodeName: sourceNode?.name,
                targetNodeName: targetNode?.name,
                nodeId: sourceNodeId,
                workFlowPriority: flow?.priority
            })
        }
    } catch (error) {
        throw error
    }
}

async function fetchNodeByWorkFlowId(workFlowId: string, nodeId: string) {
    try {
        if (!nodeId) throw new Error('Insufficient payload')
        return await node.findOne({ _id: nodeId, workflowId: workFlowId })
    } catch (error) {
        throw error
    }
}

//new version
async function excecuteActionsInTask(templatePath: any, workFlowState: any, actions: any, payload: RunActionPayload) {
    try {
        const { nodeId, sourceNodeName, targetNodeName, workFlowPriority } = payload
        if (!actions || _.isEmpty(actions)) return
        const nodeTimeLogs = fetchNodeTimeLogsInState(workFlowState, nodeId)
        if (!nodeTimeLogs || _.isEmpty(nodeTimeLogs)) throw new CustomError(WorkFlowErrors.TASK_TIMELOG_FETCH_ERROR, 500, {})
        const totalTime = computeTimeCompletion(nodeTimeLogs)
        if (!actions || _.isEmpty(actions)) return
        await runActions(actions, templatePath, totalTime, sourceNodeName || "", targetNodeName || "", workFlowPriority || "")
    } catch (error) {
        throw error
    }
}

function fetchNodeTimeLogsInState(workFlowState: any, nodeId: string) {
    try {
        const nodeInfo: any = workFlowState.tasks.filter((task: any) => {
            return task._id.toString() === nodeId
        })
        if (!nodeInfo || _.isEmpty(nodeInfo)) throw new CustomError(`Timelogs_${NodesErrors.TASK_NOT_FOUND}`, 500, {})
        return nodeInfo[0]?.timeLogs
    } catch (error) {
        throw error
    }
}


export async function deletingMultipleWorkflows(multipleIds: string[]) {
    try {
        const result: any = await WorkFlow.updateMany(
            { _id: { $in: multipleIds } },
            { is_active: false }
        )
        if (!result) throw new CustomError(WorkFlowErrors.WORKFLOW_GENERIC_MESSAGE, 500, {})
        return result;
    } catch (err: any) {
        throw err
    }
}

export async function activationOfWorkflow(workflowId: string) {

    try {
        if (!workflowId) throw new BadRequestError(WorkFlowErrors.WORKFLOW_ID_MISSING, 400, {})
        const result: any = await WorkFlow.findByIdAndUpdate(workflowId, {
            $set: {
                is_active: true
            }
        },
            { new: true }
        )
        if (!result) throw new CustomError(WorkFlowErrors.WORKFLOW_ACTIVATION_ERROR, 500, {})
        return result
    } catch (err: any) {
        throw err
    }
}