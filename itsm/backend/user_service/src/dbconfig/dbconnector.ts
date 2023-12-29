import { Pool } from 'pg';

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'itsm',
    password: 'Inf0rmati0n@123',
    port: 5432,
  }

const pool = new Pool({
	max: 20,
	//connectionString: 'postgres://root:newPassword@localhost:port/dbname',
	connectionString: `postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`,
	idleTimeoutMillis: 30000
});

export default pool
