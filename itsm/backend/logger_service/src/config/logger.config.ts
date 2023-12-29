import winston from "winston";
// const { combine } = winston.format;
import { MongoDB } from 'winston-mongodb';
import dotenv from 'dotenv'
dotenv.config()

const logger = winston.createLogger({
  format: winston.format.combine(
    // timestamp(),
    winston.format.metadata(),
    // logFormat
  ),
  transports: [
    // new winston.transports.Console(),
    new MongoDB({
      db: process.env.DB_URL!,
      options: {
        useUnifiedTopology: true,
      },
      collection: 'loggerMessage',
      level: 'info',
    }),
  ],
});

export default logger