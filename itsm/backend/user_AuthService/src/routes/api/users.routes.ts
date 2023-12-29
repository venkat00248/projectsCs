import { Router, Request, Response } from 'express';
import userController from '../../controllers/users.controllers';

const router = Router();
router.route('/list').get(async(req: Request, res: Response) => {
  const resp= await userController.usersListController(req, res);
      });
router.route('/signup').post(async(req: Request, res: Response) => {
  const resp= await userController. userSignUpController(req, res);
  
});
router.route('/login').post(async(req: Request, res: Response) => {
  const resp= await userController.userLoginController(req, res);
  
});

export default router;



 
    


