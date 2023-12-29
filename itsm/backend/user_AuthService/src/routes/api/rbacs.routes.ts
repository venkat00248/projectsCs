import { Router, Request, Response } from 'express';
import rbacController from '../../controllers/rbacs.controllers';
const router = Router();

router.route('/list').get(async(req: Request, res: Response) => {
  const resp= await rbacController.rbacsListController(req, res);
      });
router.route('/add').post(async(req: Request, res: Response) => {
  const resp= await rbacController.rbacsAddController(req, res);
  });   
 
  router.route('/:userId').get(async(req: Request, res: Response) => {
  const resp= await rbacController.rbacsInfoController(req, res);
      })
  export default router;