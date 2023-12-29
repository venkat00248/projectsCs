import { Router } from "express";
import { addTaskToWorkFlow, deleteTask, getTaskById, updateTaskInWorkFlow } from "../controllers/nodes.controller";
const router: Router = Router();

router.post('/unpublished/add-task', addTaskToWorkFlow)
router.post('/unpublished/delete-task', deleteTask)
router.post('/unpublished/update-task', updateTaskInWorkFlow)
router.get('/unpublished/get-task', getTaskById)

export default router;