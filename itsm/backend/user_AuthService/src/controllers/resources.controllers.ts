import { Request, Response } from 'express';
import resourceModel from '../models/resources.model';
import { adaptRequest } from "../helpers/adaptRequest.helper";
import { makeHttpError, errorHandler } from "../helpers/error-handler.helper";
import generatePagination from "../helpers/pagination.helper";

const resourcesListController = async(req: Request, res: Response) => {
  const httpAdapt = adaptRequest(req as any);
  let paginationQuery = httpAdapt.queryParams;
  let resp: any = {};
  try {
    paginationQuery = generatePagination(paginationQuery);
    resp = await resourceModel.resourcesList(paginationQuery);
    res.status(200).send(resp);
  } catch(error) {
    const httpError = errorHandler(error);
    const outJson = httpError.data;
    const status = httpError.status;
    res.status(status).send(outJson);
  }
}

const resourcesAddController = async (req: Request, res: Response): Promise<void> => {
  const httpAdapt = adaptRequest(req as any);
  let resp: any = {};
  const keys = Object.keys(httpAdapt.body);
  if (!keys.length) {
    const httpError = makeHttpError({
      errmsg: 'Invalid resources details',
      status: 400,
    });
    const outJson = httpError.data;
    const status = httpError.status;
    res.status(status).send(outJson);
  }
  try {
    resp = await resourceModel.resourcesAdd(httpAdapt.body);
    res.status(201).send(resp);
  } catch (error) {
    const httpError = errorHandler(error);
    const outJson = httpError.data;
    const status = httpError.status;
    res.status(status).send(outJson);
  }
};

const resourcesupdateController = async (req: Request, res: Response): Promise<void> => {
  const httpAdapt = adaptRequest(req as any);
    let resp: any = {};
    const body = httpAdapt.body;
    const id = httpAdapt.pathParams.id;
    if (!id) {
      const httpError = makeHttpError({
        errmsg: 'Invalid resources id details',
        status: 400,
      });
      const outJson = httpError.data;
      const status = httpError.status;
      res.status(status).send(outJson);
    } else if (!body) {
      const httpError = makeHttpError({
        errmsg: 'Invaild resources body details',
        status: 400,
      });
      const outJson = httpError.data;
      const status = httpError.status;
      res.status(status).send(outJson);
    }
    try {
      const resourceId = Number(httpAdapt.body);
      const pathParamsId = Number(httpAdapt.pathParams?.id);
      resp = await resourceModel.resourcesUpdate(resourceId, pathParamsId);
      res.status(201).send(resp);
    } catch (error) {
      const httpError = errorHandler(error);
      const outJson = httpError.data;
      const status = httpError.status;
      res.status(status).send(outJson);
    }
  };
export default {resourcesListController, resourcesAddController, resourcesupdateController }
 