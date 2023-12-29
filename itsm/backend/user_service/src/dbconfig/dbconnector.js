"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
var config = {
    user: 'postgres',
    host: 'localhost',
    database: 'itsm',
    password: 'Inf0rmati0n@123',
    port: 5432
};
var pool = new pg_1.Pool({
    max: 20,
    //connectionString: 'postgres://root:newPassword@localhost:port/dbname',
    connectionString: "postgres://".concat(config.user, ":").concat(config.password, "@").concat(config.host, ":").concat(config.port, "/").concat(config.database),
    idleTimeoutMillis: 30000
});
exports["default"] = pool;
