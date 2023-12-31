import "module-alias/register";
import dotenv from 'dotenv';
import server from './server';

dotenv.config();
const port = process.env.PORT || 8089;
server().listen(port);
