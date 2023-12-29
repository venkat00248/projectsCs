import logger from "../config/logger.config";


const logMessage = (req: any, res: any) => {

  const { Type, userID, Serivice_name, tenantId, Payload, message, uuid, err }: any = req.body;
  // const contentType = req.get('Content-Type');
  // Check if the request body exists and is not empty
  if (req.body && Object.keys(req.body).length > 0) {
    // Process the data and save it to a database or perform any required actions

    if (!err) {
      logger.info(message, {
        type: Type,
        service: Serivice_name,
        payload: Payload,
        user: userID,
        tenant: tenantId,
        uuid: uuid,
        err: err
      });
    }
    else {
      logger.error(message, {
        type: Type,
        service: Serivice_name,
        payload: Payload,
        user: userID,
        tenant: tenantId,
        uuid: uuid
      });
    }

    res.status(200).send({ message: 'data logged successfully', data: req.body });

  } else {
    res.status(400).send({ message: 'Invalid request: empty body' });
  }
};

export default { logMessage };


