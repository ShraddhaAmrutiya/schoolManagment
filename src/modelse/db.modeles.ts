
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();


export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT) || 5432,
});

pool.connect()
  .then(() => console.log("Database Connected!"))
  .catch((err) => {
    console.error("Database Connection Failed:", err.message);
    process.exit(1); // Exit the process if DB fails to connect
  });
