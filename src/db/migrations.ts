import { pool } from "../modelse/db.modeles";

export const createTables = async () => {
  try {
    await pool.query(`
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
  } catch (err) {
    console.error(" Error creating tables", err);
  }
};

createTables();
