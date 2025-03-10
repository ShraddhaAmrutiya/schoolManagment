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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const db_modeles_1 = require("../modelse/db.modeles");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, name, phone, password, role, teacher_key } = req.body;
    if (!username || !email || !name || !phone || !password || !role || ((role === "teacher" || role === "principal") && !teacher_key)) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!["admin", "principal", "teacher"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }
    if ((role === "teacher" || role === "principal") && teacher_key !== "TEACHER_SECRET_KEY") {
        return res.status(403).json({ message: "Invalid teacher key" });
    }
    try {
        if (role === "admin") {
            const existingAdmin = yield db_modeles_1.pool.query("SELECT * FROM users WHERE role = 'admin' LIMIT 1");
            if (existingAdmin.rows.length > 0) {
                return res.status(403).json({ message: "Admin already exists" });
            }
        }
        const existingUser = yield db_modeles_1.pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Username or Email already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const result = yield db_modeles_1.pool.query("INSERT INTO users (username, email, name, phone, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [username, email, name, phone, hashedPassword, role]);
        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield db_modeles_1.pool.query("SELECT * FROM users WHERE username = $1", [username]);
        // Check if user exists
        if (!user.rows.length) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        // Compare password
        const isMatch = yield bcryptjs_1.default.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET);
        res
            .status(200)
            .json({
            message: "User logged in successfully.",
            token
        });
    }
    catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
});
exports.login = login;
