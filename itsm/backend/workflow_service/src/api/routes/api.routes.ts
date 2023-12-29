import { Router } from "express";
import { addApiIntegrationInAction, deleteApiIntegrationAction, editApiIntegrationAction, fetchAllApiIntegrations, fetchApiActionById } from "../controllers/api.controller";
const router: Router = Router();

router.post('/unpublished/delete', deleteApiIntegrationAction)
router.post('/unpublished/create', addApiIntegrationInAction)
router.post('/unpublished/edit', editApiIntegrationAction)
router.get('/unpublished/fetch-one/:id', fetchApiActionById)
router.get('/unpublished/fetch-all/:id',fetchAllApiIntegrations)

export default router;