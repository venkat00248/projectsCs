import { Request, Response } from 'express';
import roleModel, { role } from '../models/roles.model';
import { adaptRequest } from "../helpers/adaptRequest.helper";
import { makeHttpError, errorHandler } from "../helpers/error-handler.helper";
import generatePagination from "../helpers/pagination.helper";
import usersModel, { user } from '../models/users.model';

 const rolesListController = async(req: Request, res: Response) => {
  let httpAdapt = adaptRequest(req as any);
  let paginationQuery = httpAdapt.queryParams;
  let resp: any = {};
    try {
        paginationQuery = generatePagination(paginationQuery);
        resp = await roleModel.rolesList(paginationQuery);
        res.status(200).send(resp);
    } catch(error) { 
     
      const httpError = errorHandler(error);
      
      const outJson = httpError.data;
      const status = httpError.status;
      res.status(status).send(outJson);
    }
  }
const rolesAddController = async (req: Request, res: Response): Promise<void> => {
  const httpAdapt = adaptRequest(req as any);
    let resp: any = {};
    const keys = Object.keys(httpAdapt.body);
    if (!keys.length) {
      const httpError = makeHttpError({
        errmsg: 'Invalid roles details',
        status: 400,
      });
      const outJson = httpError.data;
      const status = httpError.status;
      res.status(status).send(outJson);
    }
    try {
      resp = await roleModel.rolesAdd(httpAdapt.body);
      res.status(201).send(resp);
    } catch (error) {
      const httpError = errorHandler(error);
      const outJson = httpError.data;
      const status = httpError.status;
      res.status(status).send(outJson);
    }
  };

  const updateUserRoleController = async (req: Request, res: Response): Promise<void> => {
    try {
      let resp: any = {};
      const body = req.body;
      const { role_id } = body; // Extracting role_id from the body
      if (!role_id) {
        const httpError = makeHttpError({
          errmsg: 'Invalid roleid details',
          status: 400,
        });
        const outJson = httpError.data;
        const status = httpError.status;
        res.status(status).send(outJson);
        return;
      } else if (!body) {
        const httpError = makeHttpError({
          errmsg: 'Invalid role body details',
          status: 400,
        });
        const outJson = httpError.data;
        const status = httpError.status;
        res.status(status).send(outJson);
        return;
      }
      resp = await roleModel.updateUserRole(req, role_id, req.body.user_id);
      res.status(201).send(resp);
      } catch (error) {
      const httpError = errorHandler(error);
      const outJson = httpError.data;
      const status = httpError.status;
      res.status(status).send(outJson);
    }
  };
  
  
export default { 
  rolesListController, 
  rolesAddController, 
  updateUserRoleController
  
 
};

 