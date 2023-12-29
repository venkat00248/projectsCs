import { Router } from "express";
import AuthRoutes from "./authentication";
import Ticket from "./ticket";

const router: Router = Router();

router.use("/auth", AuthRoutes);

router.use("/ticket", Ticket)

export default router;