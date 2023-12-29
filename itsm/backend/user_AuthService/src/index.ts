import express, { Application } from 'express';
import { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import userRoutes from './routes/api/users.routes';
import roleRoutes from './routes/api/roles.routes';
import resourceRoutes from './routes/api/resources.routes';
import rbacRoutes from './routes/api/rbacs.routes';
import errormiddlewaren from './middleware/error.middleware';
import config from './config';
// import dotenv from "dotenv"
// dotenv.config()
// console.log('host========================',process.env.POSTGRES_DB)
const PORT: number = config.port || 6000;
const app: Application = express();
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(
    RateLimit({
        windowMs: 60 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: 'Too many requests  from this IP, please try again after an hour',
    }));
  
// app.use(express.json());
app.use(bodyParser.json({ limit: "500mb" }));
// app.use(bodyParser.text());
// app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/resources',resourceRoutes);
app.use('/rbacs',rbacRoutes);
app.use(errormiddlewaren);
/*app.use((_req: Request, res: Response) => {
    res.status(404).json({
        message: 'Ohh you are lost, read the API documentation to find your way back',
    });
});*/
app.listen(PORT, () => {
    console.log(`Server is starting at port:${PORT}`);
});


export default app;
