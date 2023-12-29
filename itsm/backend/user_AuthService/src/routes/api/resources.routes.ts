import { Router, Request, Response } from 'express';
import resourceController from '../../controllers/resources.controllers';
const router = Router();
router.route('/list').get(async(req: Request, res: Response) => {
  const resp= await resourceController.resourcesListController(req, res);
  });
  router.route('/add').post(async(req: Request, res: Response) => {
    const resp= await resourceController.resourcesAddController(req, res);

  });
  router.route('/update/:id').put(async(req: Request, res: Response) => {
    const resp= await resourceController.resourcesupdateController(req, res);

  });
export default router;


