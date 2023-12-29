import { Router } from "express";
import { addActionsInWorkflow, deleteActionsInWorkflow, editActionsInWorkflow, fetchActionById } from "../controllers/actions.controller";
const router: Router = Router();

router.post('/unpublished/delete', deleteActionsInWorkflow)
router.post('/unpublished/create', addActionsInWorkflow)
router.post('/unpublished/edit', editActionsInWorkflow)
router.get('/unpublished/fetch-one/:id', fetchActionById)

export default router;