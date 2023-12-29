import { Router, Request, Response } from 'express';
import roleController from '../../controllers/roles.controllers';
const router = Router();
router.route('/list').get(async(req: Request, res: Response) => {
const resp= await roleController.rolesListController(req, res);
    });
    router.route('/add').post(async(req: Request, res: Response) => {
      const resp= await roleController.rolesAddController(req, res);
  
    });
    router.route('/updateUserRole').put(async(req: Request, res: Response) => {
      const resp= await roleController.updateUserRoleController(req, res);
  
    });
    
    
   
export default router;
