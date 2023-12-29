import { Router } from "express";
import * as CronController from '../controllers/cron.controller'

const router = Router();

router.post("/cancel-cron", CronController.stopCronJob)
router.post("/restart-cron", CronController.restartCronJob)
router.post('/instant-schedule', CronController.scheduleJobImmediately)


export default router;