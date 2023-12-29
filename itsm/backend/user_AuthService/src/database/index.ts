import { Sequelize } from 'sequelize';
import config from '../config';
import  dotenv  from 'dotenv'
dotenv.config()
export const sequelize = new Sequelize({
  dialect:'postgres',
  host:"localhost",
  port:5432,
  database:'app_moderization',
  username:'postgres',
  password:'SaiRam@123',

});








