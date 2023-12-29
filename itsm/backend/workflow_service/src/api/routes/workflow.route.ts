import { Router } from "express";
import { deleteWorkflow, editWorkflow, getAllWorkFlows, getWorkFlowByID, mapWorkFlow, postWorkflow, publishWorkflow, saveWorkFlow, startWorkFlowState , deleteBulkWorkflows, makeWorkflowActive} from "../controllers/workflow.controller";
const router: Router = Router();

router.post('/unpublished/save', saveWorkFlow)
router.get("/unpublished/fetch-all", getAllWorkFlows);
router.get("/unpublished/fetch-one/:id", getWorkFlowByID);
router.post("/unpublished/create", postWorkflow);
router.post('/unpublished/delete', deleteWorkflow);
router.post('/unpublished/edit', editWorkflow)
router.post('/unpublished/delete-bulk-workflows' , deleteBulkWorkflows)
router.post('/unpublished/activatingWorkflow/:id', makeWorkflowActive)

router.post('/published/map-workflow', mapWorkFlow)
router.post('/published/publish', publishWorkflow)
router.post('/published/create-state', startWorkFlowState)

export default router;
