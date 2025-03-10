"use strict";
// import { Pool } from "pg";
// import dotenv from "dotenv";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
// dotenv.config();
// export const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: Number(process.env.DB_PORT),
// });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("🔍 Connecting to Database..."); // Add this to confirm execution
exports.pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT) || 5432,
});
exports.pool.connect()
    .then(() => console.log("✅ Database Connected!"))
    .catch((err) => {
    console.error("❌ Database Connection Failed:", err.message);
    process.exit(1); // Exit the process if DB fails to connect
});
