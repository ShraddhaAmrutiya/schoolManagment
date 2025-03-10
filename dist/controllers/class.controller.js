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
exports.deleteClass = exports.updateClass = exports.getClasses = exports.createClass = void 0;
const db_modeles_1 = require("../modelse/db.modeles");
const createClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, standard_id } = req.body;
        // Check if all required fields are provided
        if (!name || !standard_id) {
            return res.status(400).json({ message: "Name and standard_id are required" });
        }
        // Check if the standard_id exists in the standards table
        const standardCheck = yield db_modeles_1.pool.query("SELECT * FROM standards WHERE id = $1", [standard_id]);
        if (standardCheck.rows.length === 0) {
            return res.status(400).json({ message: "Invalid standard_id. No matching standard found." });
        }
        // Check if the class name already exists for the given standard_id
        const classCheck = yield db_modeles_1.pool.query("SELECT * FROM classes WHERE name = $1 AND standard_id = $2", [name, standard_id]);
        if (classCheck.rows.length > 0) {
            return res.status(400).json({ message: "Class with this name already exists for the given standard." });
        }
        // Insert into classes table
        const result = yield db_modeles_1.pool.query("INSERT INTO classes (name, standard_id) VALUES ($1, $2) RETURNING *", [name, standard_id]);
        res.status(201).json({ message: "Class created successfully", class: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating class", error: error.message });
    }
});
exports.createClass = createClass;
const getClasses = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_modeles_1.pool.query("SELECT * FROM classes");
    res.json(result.rows);
});
exports.getClasses = getClasses;
const updateClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, standard_id } = req.body;
    try {
        // Check if the standard_id exists
        const standardCheck = yield db_modeles_1.pool.query("SELECT id FROM standards WHERE id = $1", [standard_id]);
        if (standardCheck.rows.length === 0) {
            return res.status(400).json({ message: "Invalid standard_id. No such standard exists." });
        }
        // Update the class
        const result = yield db_modeles_1.pool.query("UPDATE classes SET name = $1, standard_id = $2 WHERE id = $3 RETURNING *", [name, standard_id, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json({ message: "Class updated successfully", class: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating class", error: error.message });
    }
});
exports.updateClass = updateClass;
const deleteClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_modeles_1.pool.query("DELETE FROM classes WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json({ message: "Class deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting class", error: error.message });
    }
});
exports.deleteClass = deleteClass;
