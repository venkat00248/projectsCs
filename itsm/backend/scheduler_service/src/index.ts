import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect } from './config/database.config';
import * as fs from 'fs/promises';
import { CronConfig } from './types/cron';
import { crons } from './cron/index';
//import cron from 'node-cron';
import agenda from './agenda';
import * as bodyParser from 'body-parser';
import apiRoutes from './routes/index'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/api', apiRoutes)
async function startCronJobs() {
  try {
    const configs: { cron: CronConfig[] } = JSON.parse(await fs.readFile('cronConfig.json', { 'encoding': "utf-8" }))
    configs?.cron?.forEach((cronfig: CronConfig) => {
      const schedulerAction = crons[cronfig.name as keyof typeof crons].schedulerAction
      const scheduler = crons[cronfig.name as keyof typeof crons].scheduleService
      agenda.define(cronfig.name, schedulerAction)
      scheduler(cronfig.name, cronfig.scheduler)
    })
  } catch (error) {
    throw error
  }
}

app.get('/', (req: Request, res: Response) => {
  const params = req.params
  console.log(params)
  res.send('Express + TypeScript Server');
});

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  await connect()
  await startCronJobs()
});
