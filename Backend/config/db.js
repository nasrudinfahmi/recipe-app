import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  waitForConnections: process.env.WAIT_FOR_CONNECTION,
  connectionLimit: process.env.CONNECTION_LIMIT,
  maxIdle: process.env.MAX_IDLE,
  idleTimeout: process.env.IDLE_TIMEOUT,
  queueLimit: process.env.QUEUE_LIMIT,
  enableKeepAlive: process.env.ENABLE_KEEP_ALIVE,
  keepAliveInitialDelay: process.env.KEEP_ALIVE_INITIAL_DELAY,
});

export default db;
