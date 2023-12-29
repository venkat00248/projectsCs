import { Router } from "express";
import AuthRoutes from "./authentication";
import PingRoutes from "./ping"

const router: Router = Router();

router.use("/auth", AuthRoutes);
router.use("/ping", PingRoutes);

export default router;