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
exports.deletesubject = exports.updatesubjects = exports.getsubjects = exports.addsubject = void 0;
const db_modeles_1 = require("../modelse/db.modeles");
const addsubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Subject name is required" });
    }
    try {
        const existingSubject = yield db_modeles_1.pool.query('SELECT * FROM subjects WHERE name =$1', [name]);
        if (existingSubject.rows.length > 0) {
            return res.status(400).json({ message: "Subject already exists" });
        }
        const result = yield db_modeles_1.pool.query("INSERT INTO subjects (name) VALUES ($1) RETURNING *", [name]);
        res.status(201).json({ message: "Subject added successfully", subject: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.addsubject = addsubject;
const getsubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_modeles_1.pool.query("SELECT * FROM subjects");
        res.status(200).json({ message: "subjects fatched successfully", subjects: result.rows });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting standerd", error: error.message });
    }
});
exports.getsubjects = getsubjects;
const updatesubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }
    try {
        const result = yield db_modeles_1.pool.query("UPDATE classes SET name = $1 WHERE id = $2 RETURNING *", [name, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Subject not found" });
        }
        console.log("✅ Subject updated:", result.rows[0]);
        res.status(200).json({ message: "Subject updated successfully", subject: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating subject", error: error.message });
    }
});
exports.updatesubjects = updatesubjects;
const deletesubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_modeles_1.pool.query('DELETE FROM subjects WHERE id=$1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "subject not found" });
        }
        res.status(200).json({ message: "subject deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting standerd", error: error.message });
    }
});
exports.deletesubject = deletesubject;
