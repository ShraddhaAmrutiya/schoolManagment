import { Request, Response } from "express";
import { pool } from "../modelse/db.modeles"
import bcrypt from "bcryptjs"

export const addStudent = async (req: Request, res: Response) => {
  const { name, roll_number, standard_id, class_id, teacher_id } = req.body;

  if (!name || !roll_number || !standard_id || !class_id || !teacher_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const teacherCheck = await pool.query("SELECT * FROM users WHERE id = $1 AND role = 'teacher'", [teacher_id]);
    if (teacherCheck.rows.length === 0) {
      return res.status(400).json({ message: "Invalid teacher ID. Must be a teacher." });
    }

    const standardCheck = await pool.query("SELECT * FROM standards WHERE id = $1", [standard_id]);
    if (standardCheck.rows.length === 0) {
      return res.status(400).json({ message: "Invalid standard ID" });
    }

    const classCheck = await pool.query("SELECT * FROM classes WHERE id = $1", [class_id]);
    if (classCheck.rows.length === 0) {
      return res.status(400).json({ message: "Invalid class ID" });
    }

    const rollNumberCheck = await pool.query("SELECT * FROM students WHERE roll_number = $1", [roll_number]);
    if (rollNumberCheck.rows.length > 0) {
      return res.status(400).json({ message: "Roll number already exists" });
    }

    const randomPassword = Math.random().toString(36).slice(-8); 

    const result = await pool.query(
      `INSERT INTO students (name, roll_number, standard_id, class_id, teacher_id, password) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, roll_number, standard_id, class_id, teacher_id, randomPassword]
    );

    res.status(201).json({
      message: "Student registered successfully",
      student: {
        id: result.rows[0].id,
        name: result.rows[0].name,
        roll_number: result.rows[0].roll_number,
        password: randomPassword 
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};


// Update Student (Partial Update)
export const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body; // Contains only the fields to be updated

  try {
    //  Check if student exists
    const studentCheck = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
    if (studentCheck.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    //  Generate dynamic update query
    const updateFields = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`);
    const updateValues = Object.values(updates);

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }


    const query = `UPDATE students SET ${updateFields.join(", ")} WHERE id = $${
      updateFields.length + 1
    } RETURNING *`;

    const result = await pool.query(query, [...updateValues, id]);

    res.status(200).json({
      message: "Student updated successfully",
      student: result.rows[0],
    });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: (error as Error).message });
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM students");

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving students", error: (error as Error).message });
  }
};

export const deletestudent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM students WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "student not found" });
    }

    res.status(200).json({ message: "student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error: (error as Error).message });
  }
};