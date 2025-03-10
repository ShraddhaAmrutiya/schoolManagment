"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentMarks = exports.addMarks = void 0;
const db_modeles_1 = require("../modelse/db.modeles");
const addMarks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { student_id, subject_id, marks } = req.body;
    if (!student_id || !subject_id || marks === undefined) {
        return res.status(400).json({ message: "Student ID, Subject ID, and Marks are required" });
    }
    if (marks < 0 || marks > 100) {
        return res.status(400).json({ message: "Marks must be between 0 and 100" });
    }
    try {
        const studentExists = yield db_modeles_1.pool.query("SELECT * FROM students WHERE id = $1", [student_id]);
        if (!studentExists.rows.length) {
            return res.status(404).json({ message: "Student not found" });
        }
        const subjectExists = yield db_modeles_1.pool.query("SELECT * FROM subjects WHERE id = $1", [subject_id]);
        if (!subjectExists.rows.length) {
            return res.status(404).json({ message: "Subject not found" });
        }
        const result = yield db_modeles_1.pool.query("INSERT INTO student_marks (student_id, subject_id, marks) VALUES ($1, $2, $3) RETURNING *", [student_id, subject_id, marks]);
        res.status(201).json({ message: "Marks added successfully", marks: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.addMarks = addMarks;
const getStudentMarks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roll_number } = req.params;
    try {
        const student = yield db_modeles_1.pool.query("SELECT * FROM students WHERE roll_number = $1", [roll_number]);
        if (!student.rows.length) {
            return res.status(404).json({ message: "Student not found" });
        }
        const marks = yield db_modeles_1.pool.query(`SELECT s.name AS subject, sm.marks 
             FROM student_marks sm
             JOIN subjects s ON sm.subject_id = s.id
             WHERE sm.student_id = $1`, [student.rows[0].id]);
        res.status(200).json({ student: student.rows[0], marks: marks.rows });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.getStudentMarks = getStudentMarks;
