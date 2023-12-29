import "module-alias/register";
import * as dotenv from 'dotenv';
import server from './server';
dotenv.config();
const port = process.env.PORT || 8080;
server().listen(port);
