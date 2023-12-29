import { Router } from "express";
import cron from "./cron.route"

const routes = Router();

routes.use("/cron", cron);

export default routes;