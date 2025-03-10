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
exports.deletestudent = exports.getStudents = exports.updateStudent = exports.addStudent = void 0;
const db_modeles_1 = require("../modelse/db.modeles");
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, roll_number, standard_id, class_id, teacher_id } = req.body;
    if (!name || !roll_number || !standard_id || !class_id || !teacher_id) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const teacherCheck = yield db_modeles_1.pool.query("SELECT * FROM users WHERE id = $1 AND role = 'teacher'", [teacher_id]);
        if (teacherCheck.rows.length === 0) {
            return res.status(400).json({ message: "Invalid teacher ID. Must be a teacher." });
        }
        const standardCheck = yield db_modeles_1.pool.query("SELECT * FROM standards WHERE id = $1", [standard_id]);
        if (standardCheck.rows.length === 0) {
            return res.status(400).json({ message: "Invalid standard ID" });
        }
        const classCheck = yield db_modeles_1.pool.query("SELECT * FROM classes WHERE id = $1", [class_id]);
        if (classCheck.rows.length === 0) {
            return res.status(400).json({ message: "Invalid class ID" });
        }
        const rollNumberCheck = yield db_modeles_1.pool.query("SELECT * FROM students WHERE roll_number = $1", [roll_number]);
        if (rollNumberCheck.rows.length > 0) {
            return res.status(400).json({ message: "Roll number already exists" });
        }
        const randomPassword = Math.random().toString(36).slice(-8);
        const result = yield db_modeles_1.pool.query(`INSERT INTO students (name, roll_number, standard_id, class_id, teacher_id, password) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [name, roll_number, standard_id, class_id, teacher_id, randomPassword]);
        res.status(201).json({
            message: "Student registered successfully",
            student: {
                id: result.rows[0].id,
                name: result.rows[0].name,
                roll_number: result.rows[0].roll_number,
                password: randomPassword
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.addStudent = addStudent;
// Update Student (Partial Update)
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body; // Contains only the fields to be updated
    try {
        //  Check if student exists
        const studentCheck = yield db_modeles_1.pool.query("SELECT * FROM students WHERE id = $1", [id]);
        if (studentCheck.rows.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        //  Generate dynamic update query
        const updateFields = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`);
        const updateValues = Object.values(updates);
        if (updateFields.length === 0) {
            return res.status(400).json({ message: "No fields provided for update" });
        }
        const query = `UPDATE students SET ${updateFields.join(", ")} WHERE id = $${updateFields.length + 1} RETURNING *`;
        const result = yield db_modeles_1.pool.query(query, [...updateValues, id]);
        res.status(200).json({
            message: "Student updated successfully",
            student: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
});
exports.updateStudent = updateStudent;
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_modeles_1.pool.query("SELECT * FROM students");
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No students found" });
        }
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving students", error: error.message });
    }
});
exports.getStudents = getStudents;
const deletestudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_modeles_1.pool.query("DELETE FROM students WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "student not found" });
        }
        res.status(200).json({ message: "student deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting student", error: error.message });
    }
});
exports.deletestudent = deletestudent;
