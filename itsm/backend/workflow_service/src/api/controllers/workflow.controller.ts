import { Request, Response } from "express";
import { WorkFlow } from "../../models/workflow.model";
import { deleteWorkFlow, deletingMultipleWorkflows, editWorkFlow, fetchAllWorkflows, getWorkFlowById, publishWorkFlow, saveWorkflow, setInitialWorkflowState, traceWorkFlow , activationOfWorkflow} from "../services/workflow.service";
import { SuccessMessages } from "../../constants/successConstants";

const SLA = {
  p1: '8',
  p2: '6',
  p3: '4'
}
console.log('sla', SLA)
export const postWorkflow = async (req: Request, res: Response) => {
  // res.json({body:req.body}).status(200);
  // return;
  let {
    wf, created_by, ticket_type_id, name, description, is_active, is_published, } = req.body;

    console.log("g",req.body)

  try {
    wf = JSON.stringify(wf)
    const workFlow = await WorkFlow.create({
      wf,
      created_by,
      ticket_type_id,
      name,
      description,
      is_active,
      is_published,
    });
    res.status(201).json({ success: true, data: { result: workFlow }, error: "" });
  } catch (error) {
    //   console.log(error)
    //   console.error("Error during  post a work flow:", error);
    res.status(500).json({ success: false, data: { result: "An error occurred in work flow." }, error: error });
  }
}

export const deleteWorkflow = async (req: Request, res: Response) => {
  try {
    const { workFlowId } = req?.body
    const result = await deleteWorkFlow(workFlowId)
    res.status(201).json({
      success: true,
      data: { result: result },
      error: ""
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: "",
      error: error.message
    });
  }
}

export const saveWorkFlow = async (req: Request, res: Response) => {
  try {
    const { workFlowJson, workFlowId } = req?.body
    const result = await saveWorkflow(workFlowId, workFlowJson)
    res.status(201).json({
      success: true,
      data: { result: result },
      error: ""
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: "",
      error: error.message
    });
  }
}

export const getWorkFlowByID = async (req: Request, res: Response) => {
  try {
    const workflowId = req.params.id;
    const workFlow = await getWorkFlowById(workflowId)
    res.json({
      success: true,
      data: {
        result: workFlow
      }, error: ""
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      data: "",
      error: error.message
    });
  }
}

export const getAllWorkFlows = async (_: Request, res: Response) => {
  try {
    const workFlows = await fetchAllWorkflows()
    res.status(200).json({
      success: true,
      data: { result: workFlows },
      error: ""
    });
  }
  catch (error: any) {
    res.status(500).json({
      success: false,
      data: { result: "Internal server error" },
      error: error.message
    });
  }
}


export async function publishWorkflow(req: Request, res: Response) {
  try {
    const { workFlowId } = req.body
    const result = await publishWorkFlow(workFlowId)
    res.status(200).json({
      success: true,
      data: {
        result: result
      },
      error: ""
    })
  } catch (err: any) {
    console.log('err==============================', err)
    res.status(500).send({
      success: false,
      data: "",
      error: err.message
    })
  }
}

export async function mapWorkFlow(req: Request, res: Response) {
  try {
    const { ticketId, workFlowId, transitionNodes } = req.body
    const { source, target } = transitionNodes
    await traceWorkFlow(ticketId, workFlowId, source, target)
    res.status(200).json({
      success: true,
      data: {
        result: {
          statusId: target,
          message: "State Transition Successful"
        }
      },
      error: ""
    })
  } catch (err: any) {
    res.status(500).send({
      success: false,
      data: "",
      error: err.message
    })
  }
}

export async function editWorkflow(req: Request, res: Response) {
  try {
    const { workFlowId, editPayload } = req.body
    const result = await editWorkFlow(workFlowId, editPayload)
    res.status(200).json({
      success: true,
      data: {
        result: result
      },
      error: ""
    })
  } catch (error: any) {
    res.status(500).send({
      success: false,
      data: "",
      error: error.message
    })
  }
}


export async function startWorkFlowState(req: Request, res: Response) {
  try {
    const { ticketId, workFlowId } = req?.body
    await setInitialWorkflowState(ticketId, workFlowId)
    res.status(200).json({
      success: true,
      data: {
        result: SuccessMessages.WORKFLOW_STATE_SET
      },
      error: ""
    })
  } catch (err: any) {
    res.status(500).send({
      success: false,
      data: "",
      error: err.message
    })
  }
}



export async function deleteBulkWorkflows(req: Request, res: Response) {
  try {
    const multipleIds = req?.body
    let result:any = await deletingMultipleWorkflows(multipleIds)
    res.status(200).json({
      success: true,
      data: {
        result
      },
      error: ""
    })
  } catch (err: any) {
    res.status(500).send({
      success: false,
      data: "",
      error: err.message
    })
  }
}

export async function makeWorkflowActive(req: Request, res: Response) {
  try {
    const workflowId = req.params.id
    const result: any = await activationOfWorkflow(workflowId)
    res.status(200).send({
      Success: true,
      data: {
        result: result
      },
      error: ""
    })
  } catch (err: any) {
    res.status(500).send({
      success: false,
      data: "",
      error: err.message
    })

  }
}
