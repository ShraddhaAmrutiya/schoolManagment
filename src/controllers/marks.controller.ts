import { Request, Response } from "express";
import { pool } from "../modelse/db.modeles";


export const addMarks = async (req: Request, res: Response) => {
    const { student_id, subject_id, marks } = req.body;

    if (!student_id || !subject_id || marks === undefined) {
        return res.status(400).json({ message: "Student ID, Subject ID, and Marks are required" });
    }

    if (marks < 0 || marks > 100) {
        return res.status(400).json({ message: "Marks must be between 0 and 100" });
    }

    try {
        const studentExists = await pool.query("SELECT * FROM students WHERE id = $1", [student_id]);
        if (!studentExists.rows.length) {
            return res.status(404).json({ message: "Student not found" });
        }

        const subjectExists = await pool.query("SELECT * FROM subjects WHERE id = $1", [subject_id]);
        if (!subjectExists.rows.length) {
            return res.status(404).json({ message: "Subject not found" });
        }

        const result = await pool.query(
            "INSERT INTO student_marks (student_id, subject_id, marks) VALUES ($1, $2, $3) RETURNING *",
            [student_id, subject_id, marks]
        );

        res.status(201).json({ message: "Marks added successfully", marks: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
};

export const getStudentMarks = async (req: Request, res: Response) => {
    const { roll_number } = req.params;

    try {
        const student = await pool.query("SELECT * FROM students WHERE roll_number = $1", [roll_number]);

        if (!student.rows.length) {
            return res.status(404).json({ message: "Student not found" });
        }

        const marks = await pool.query(
            `SELECT s.name AS subject, sm.marks 
             FROM student_marks sm
             JOIN subjects s ON sm.subject_id = s.id
             WHERE sm.student_id = $1`,
            [student.rows[0].id]
        );

        res.status(200).json({ student: student.rows[0], marks: marks.rows });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
};
