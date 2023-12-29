import { Router } from "express";
import PingRoutes from "./ping";

const router: Router = Router();

router.use("/ping", PingRoutes);

export default router;