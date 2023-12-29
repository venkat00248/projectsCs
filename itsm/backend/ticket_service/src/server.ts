import {Express, Request, Response } from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import {errorHandler} from "./utils";
// import { sequelize } from './models/TicketDetails.model';
import { connect } from './config/database';
import routes from './api'
import cors from 'cors';
import express = require('express');
const corsOptions = {
  origin: "*"
}
// Call the connect function somewhere in your code
const app = () => {
  const app = express();
  app.use(cors(corsOptions))

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // // parse application/json
  // app.use(bodyParser.json())


  app.use((_: Request, res: Response, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Credentials, Set-Cookie',
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Accept, Access-Control-Allow-Credentials, Cross-Origin',
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

  app.use(express.json());

  // Routes
  app.use('/', routes);
  app.get('/health', (_, res) => res.status(200).send({ success: true }));


  app.use(errorHandler)

  // All non-specified routes return 404
  app.get('*', (_, res) => res.status(404).send('Not Found'));
  const server = http.createServer(app);

  server.on('listening', async() => {
    console.info(`Ticket service listening on port ${process.env.PORT || 8080}...`);
    await connect();
  });
  // sequelize.sync().then(() => {
  //   console.log('Database synchronized');
  // }).catch((error:any) => {
  //   console.error('Error synchronizing database:', error);
  // });
  return server;
};

export default app;
