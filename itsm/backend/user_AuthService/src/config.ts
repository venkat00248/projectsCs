
import dotenv from 'dotenv';
dotenv.config();
const config :any= {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_DB_TEST: process.env.POSTGRES_DB_TEST,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD
    
  };
export default config;
