import { Request, Response } from 'express';
import rbacModel from '../models/rbacs.model';
import { adaptRequest } from "../helpers/adaptRequest.helper";
import { makeHttpError, errorHandler } from "../helpers/error-handler.helper";
import generatePagination from "../helpers/pagination.helper";
  

const rbacsListController = async(req: Request, res: Response) => {
  let httpAdapt = adaptRequest(req as any);
  let paginationQuery = httpAdapt.queryParams;
  let resp: any = {};
    try {
        paginationQuery = generatePagination(paginationQuery);
        resp = await rbacModel.rbacsList(paginationQuery);
        res.status(200).send(resp);
    } catch(error) { 
      const httpError = errorHandler(error);
      const outJson = httpError.data;
      const status = httpError.status;
      res.status(status).send(outJson);
    }
  }
const rbacsAddController = async (req: Request, res: Response): Promise<void> => {
    const httpAdapt = adaptRequest(req as any);
    let resp: any = {};
    const keys = Object.keys(httpAdapt.body);
    if (!keys.length) {
      const httpError = makeHttpError({
        errmsg: 'Invalid rbacs details',
        status: 400,
      });
      const outJson = httpError.data;
      const status = httpError.status;
      res.status(status).send(outJson);
    }
    try {
      resp = await rbacModel.rbacsAdd(httpAdapt.body);
      res.status(201).send(resp);
    } catch (error) {
      const httpError = errorHandler(error);
      const outJson = httpError.data;
      const status = httpError.status;
      res.status(status).send(outJson);
    }
  };
   

  const rbacsInfoController = async(req: Request, res: Response) => {
    let httpAdapt = adaptRequest(req as any);
    let userId = req.params.userId;
    let resp: any = {};
    if (!userId) {
      let httpError = makeHttpError({
        errmsg: "Invalid rbac userId details",
        status: 400,
      });
      let outJson = httpError.data;
      let status = httpError.status;
      res.send(outJson).status(status);
    }
    
      try {
          resp = await rbacModel.rbacsInfo(userId);
          res.status(200).send(resp);
      } catch(error) { 
        const httpError = errorHandler(error);
        const outJson = httpError.data;
        const status = httpError.status;
        res.status(status).send(outJson);
      }
    }
  export default {rbacsListController, rbacsAddController,rbacsInfoController};