import { Request, Response } from "express";
import userModel from '../models/users.model';
import { adaptRequest } from "../helpers/adaptRequest.helper";
import { makeHttpError, errorHandler } from "../helpers/error-handler.helper";
import generatePagination from "../helpers/pagination.helper";
const usersListController = async(req: Request, res: Response) => {
    let httpAdapt = adaptRequest(req as any);
    let paginationQuery = httpAdapt.queryParams;
    let resp: any = {};
      try {
          paginationQuery = generatePagination(paginationQuery);
          resp = await userModel.usersList(paginationQuery);
          res.status(200).send(resp);
      } catch(error) { 
       
        const httpError = errorHandler(error);
        
        const outJson = httpError.data;
        const status = httpError.status;
        res.status(status).send(outJson);
      }
    }

const userSignUpController = async (req: Request, res: Response): Promise<void> => {
  let resp: any = {};
  resp = await userModel.userSignUp(req.body);
  if(resp.status ===201) {
      res.status(201).send(resp);
  } else {
      res.status(400).send(resp);
  }
};

const userLoginController = async (req: Request, res: Response): Promise<void> => {
  let resp: any = {};
  resp = await userModel.userLogin(req.body);
  if (resp.status === 201) {
    res.status(201).send(resp);
  } else {
    res.status(400).send(resp);
  }
};

export default {usersListController, userSignUpController, userLoginController};








  