import { Router } from "express";
import AuthRoutes from "./authentication";
import {MessageQueueRoutes} from "./message_queue";
import PingRoutes from "./ping"

const router: Router = Router();

router.use("/auth", AuthRoutes);
router.use("/ping", PingRoutes);
router.use("/kafka", MessageQueueRoutes)

export default router;