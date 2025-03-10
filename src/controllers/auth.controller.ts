import{Request, Response}from "express";
import { pool } from "../modelse/db.modeles";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

export const register = async (req: Request, res: Response) => {
  const { username, email, name, phone, password, role, teacher_key } = req.body;

  if (!username || !email || !name || !phone || !password || !role ||((role === "teacher" || role === "principal") && !teacher_key)) {
      return res.status(400).json({ message: "All fields are required" });
  }

  if (!["admin","principal", "teacher"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
  }

  if ((role === "teacher" || role === "principal") && teacher_key !== "TEACHER_SECRET_KEY") {
      return res.status(403).json({ message: "Invalid teacher key" });
  }

  try {
    if (role === "admin") {
      const existingAdmin = await pool.query("SELECT * FROM users WHERE role = 'admin' LIMIT 1");
      if (existingAdmin.rows.length > 0) {
        return res.status(403).json({ message: "Admin already exists" });
      }
    }
      const existingUser = await pool.query(
          "SELECT * FROM users WHERE username = $1 OR email = $2",
          [username, email]
      );

      if (existingUser.rows.length > 0) {
          return res.status(400).json({ message: "Username or Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
          "INSERT INTO users (username, email, name, phone, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          [username, email, name, phone, hashedPassword, role]
      );

      res.status(201).json({
          message: "User registered successfully",
          user: result.rows[0],
      });

  } catch (error) {
      res.status(500).send({ message: "Server error", error: (error as Error).message });
  }
};


export const login =async(req:Request, res:Response)=>{
    const {username,password}=req.body 
try {
  const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        // Check if user exists
        if (!user.rows.length) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

    const token =jwt.sign({id:user.rows[0].id, role:user.rows[0].role}, process.env.JWT_SECRET!)
    res
    .status(200)
    .json({
      message: "User logged in successfully.",
      token
    });
  
} catch (error) {
  res.status(500).send({ message: "Server error", error: (error as Error).message });
}
}     