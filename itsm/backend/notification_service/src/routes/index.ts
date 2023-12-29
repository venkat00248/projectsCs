import { Router, Request, Response } from "express";
import email from "./email.route"

const routes = Router();

routes.use("/email", email);

export default routes;