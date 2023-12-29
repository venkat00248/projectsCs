import { Router } from "express";
import { addValidationsInWorkflow, deleteValidationsInWorkflow, updateValidationsInWorkflow } from "../controllers/validations.controller";
const router: Router = Router();

router.post('/unpublished/delete', deleteValidationsInWorkflow)
router.post('/unpublished/create', addValidationsInWorkflow)
router.post('/unpublished/edit', updateValidationsInWorkflow)

export default router;