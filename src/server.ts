import express, { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import classRoutes from "./routes/class.routes";
import standardRoutes from "./routes/standerd.routes"
import studentRoutes from "./routes/student.routes";
import subjectRoutes from "./routes/subject.routes";
import marksRoutes from "./routes/marks.routes";
import {createTables} from "./db/migrations";
import { setupSwagger } from "./swagger/swaggersetup";


dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Debugging Middleware
app.use((req, res, next) => {
  console.log(`💡 Incoming Request: ${req.method} ${req.url}`);
  next();
})
setupSwagger(app);

createTables().then(() => {
    console.log("Database initialized.");
  }).catch((err) => {
    console.error("Database initialization failed:", err);
  });

app.use("/auth", authRoutes);
app.use("/classes", classRoutes);
app.use("/standards", standardRoutes);
app.use("/students", studentRoutes);
app.use("/subjects", subjectRoutes);
app.use("/marks", marksRoutes);



app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log error for debugging

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : undefined, // Show full error only in development
  });
});


app.listen(3000, () => console.log("Server running on port 3000"));
