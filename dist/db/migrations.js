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
exports.createTables = void 0;
const db_modeles_1 = require("../modelse/db.modeles");
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_modeles_1.pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'principal', 'teacher'))
      );

      CREATE TABLE IF NOT EXISTS standards (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS classes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        standard_id INT NOT NULL REFERENCES standards(id) ON DELETE CASCADE
      );

 CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    roll_number VARCHAR(50) NOT NULL UNIQUE, 
    standard_id INT NOT NULL REFERENCES standards(id) ON DELETE CASCADE,
    class_id INT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    teacher_id INT REFERENCES users(id) ON DELETE SET NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    password TEXT NOT NULL
);

      CREATE TABLE IF NOT EXISTS subjects (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE
    );
      
      CREATE TABLE IF NOT EXISTS student_marks (
        id SERIAL PRIMARY KEY,
        student_id INT REFERENCES students(id) ON DELETE CASCADE,
        subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,
        marks INT CHECK (marks >= 0 AND marks <= 100),
        UNIQUE(student_id, subject_id) -- Prevents duplicate marks for the same subject
);


    `);
        console.log("Tables created successfully");
    }
    catch (err) {
        console.error(" Error creating tables", err);
    }
});
exports.createTables = createTables;
(0, exports.createTables)();
