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
exports.deletestanderd = exports.updateStanderd = exports.getStandards = exports.createStandard = void 0;
const db_modeles_1 = require("../modelse/db.modeles");
const createStandard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const result = yield db_modeles_1.pool.query("INSERT INTO standards (name) VALUES ($1) RETURNING *", [name]);
        res.status(201).json({ message: "Standard created successfully", standard: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating standard", error: error.message });
    }
});
exports.createStandard = createStandard;
const getStandards = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_modeles_1.pool.query("SELECT * FROM standards");
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No standards found" });
        }
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching standards", error: error.message });
    }
});
exports.getStandards = getStandards;
const updateStanderd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!id) {
            return res.status(400).json({ message: "ID parameter is required" });
        }
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const result = yield db_modeles_1.pool.query("UPDATE standards SET name = $1 WHERE id = $2 RETURNING *", [name, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Standard not found" });
        }
        res.status(200).json({ message: "Standard updated successfully", standard: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating standard", error: error.message });
    }
});
exports.updateStanderd = updateStanderd;
const deletestanderd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID parameter is required" });
        }
        const result = yield db_modeles_1.pool.query("DELETE FROM standards WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Standard not found" });
        }
        res.status(200).json({ message: "Standard deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting standard", error: error.message });
    }
});
exports.deletestanderd = deletestanderd;
