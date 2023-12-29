import express, { Request, Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { errorHandler } from "./utils";
//import pool from "./dbconfig/dbconnector"
import routes from './api'
//import { sequelize } from './modals/WorkFlow';
import { connect } from './dbconfig/mongo.config';
import cors from "cors";
import "reflect-metadata";
import path from 'path'
//import { KafkaProducer } from './utils/kafka-publisher';
import { consumer } from './utils/kafka-consumer';

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Workflow Service',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Local Environment'
      },
      {
        url: 'https://itsmworkflow.cloud4c.com',
        description: 'UAT environment'
      }
    ]
  },
  apis: [ './swagger.yaml'], // Path to the Swagger documentation file(s)
};


// Initialize Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);



//import packageJson from '../../package.json';
//import packageJsonApp from '../package.json';


// process.on('SIGQUIT', function () {
//   // process.on('exit', function() {
//   // process.on('SIGINT', function() {
//   console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
//   // some other closing procedures go here
//   process.exit(1);
// });

const corsOptions = {
  origin: '*'
}

const app = () => {
  const app = express();
  app.use(cors(corsOptions))
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))


  /*pool.connect(function () {
    // if (err) throw new Error(err);
    console.log('Connected to Postgres Database');
  });*/

  /*sequelize.sync().then(() => {
      console.log('Database synchronized');
    }).catch((error: any) => {
      console.error('Error synchronizing database:', error);
    });*/
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

  // Serve the Swagger UI at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(errorHandler)


  // All non-specified routes return 404
  app.get('*', (_, res) => res.status(404).send('Not Found'));
  const server = http.createServer(app);

  server.on('listening', async () => {
    console.info(`Work flow service listening on port ${process.env.PORT || 8080}...`);
    await connect()
    await consumer()
  });

  return server;
};


export default app;
