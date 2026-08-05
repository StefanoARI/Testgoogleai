import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MYSQL_URL;

if (!connectionString) {
  console.warn("⚠️ MYSQL_URL environment variable is not set. Database operations will fail if executed.");
}

const poolConnection = mysql.createPool({
  uri: connectionString || "mysql://user:pass@localhost:3306/db", // Dummy fallback to prevent immediate crash on init
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, 
  idleTimeout: 60000, 
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export const db = drizzle(poolConnection, { schema, mode: "default" });
