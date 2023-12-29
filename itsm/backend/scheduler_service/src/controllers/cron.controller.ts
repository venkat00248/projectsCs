import { crons } from "../cron/index";
import agenda from "../agenda";
import { Request, Response } from "express";


export async function stopCronJob(req: Request, res: Response) {
    try {
        const { jobName } = req.body
        const result: number = await agenda.cancel({ name: jobName })
        res.status(200).json({
            message: "cron job stopped successfully",
            data: result,
            error: ""
        })
    } catch (err) {

        res.status(500).json({
            message: "cron job cancellation went wrong",
            data: "",
            error: err
        })
    }
}

export async function scheduleJobImmediately(req: Request, res: Response) {
    try {
        const { jobName, data } = req.body
        await agenda.now(jobName, data)
        res.status(200).json({
            message: "cron job ran successfully",
            data: "",
            error: ""
        })
    } catch (err) {
        console.log('err==============', err)
        res.status(500).json({
            message: "running cron job went wrong",
            data: "",
            error: err
        })
    }
}

export async function restartCronJob(req: Request, res: Response) {
    try {
        const { jobName, timer } = req.body
        const response = await agenda.jobs({ name: jobName }, { lastFinishedAt: -1 }, 1, 0)
        if (response && response.length > 0) throw new Error('Job Already Running')
        const schedulerAction = crons[jobName as keyof typeof crons].schedulerAction
        const scheduler = crons[jobName as keyof typeof crons].scheduleService
        agenda.define(jobName, schedulerAction)
        scheduler(jobName, timer)
        res.status(200).json({
            message: "cron job restarted successfully",
            data: "",
            error: ""
        })
    } catch (err) {
        console.log('err==============', err)
        res.status(500).json({
            message: "running cron job went wrong",
            data: "",
            error: err
        })
    }
}