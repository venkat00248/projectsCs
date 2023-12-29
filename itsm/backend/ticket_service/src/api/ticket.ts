import { Request, Response, NextFunction, Router } from "express";
import { createTicket, createTicketTypes, deleteTicketTypeMapping, editTicketTypeMapping, getAllTickets, getTicketById, listAllMappings, listAllTicketTypes, mapWorkFlowToTicketType, publishTicketTypeMapping, updateTicket, updateTicketCurrentStatus} from "./controllers/ticket.controller";
// import { body } from "express-validator";
// import { handleValidationErrors } from "../utils";
// import { NotFoundError } from "@errors";

const router: Router = Router();

router.get("/", async (_: Request, res: Response, next: NextFunction) => {
  try {
   res.status(200).send({
    success: true,
    message: "hello from ticket service"
   });
  } catch (err) {
   next(err);
  }
 });
 router.post("/createTicket",createTicket );
 router.put("/updateTicket",updateTicket );
 router.get('/getAllTickets',getAllTickets)
 router.get('/getTicketById/:id',getTicketById);
 router.post('/createTicketType', createTicketTypes);
 router.get('/getAllTicketTypes', listAllTicketTypes);
 router.post('/mapTicketType', mapWorkFlowToTicketType);
 router.get('/getMappedWorkflow',listAllMappings);
 router.post('/setTicketStatus', updateTicketCurrentStatus)
 router.post('/deleteTicketTypeMapping', deleteTicketTypeMapping)
 router.post('/editTicketTypeMapping', editTicketTypeMapping)
 router.post('/publishTicketTypeMapping', publishTicketTypeMapping)
export default router;
