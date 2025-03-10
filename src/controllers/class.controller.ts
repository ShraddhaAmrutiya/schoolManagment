import { Request, Response, NextFunction } from "express";
import { pool } from "../modelse/db.modeles";
export const createClass = async (req: Request, res: Response) => {
  try {
    const { name, standard_id } = req.body;

    // Check if all required fields are provided
    if (!name || !standard_id) {
      return res.status(400).json({ message: "Name and standard_id are required" });
    }

    // Check if the standard_id exists in the standards table
    const standardCheck = await pool.query("SELECT * FROM standards WHERE id = $1", [standard_id]);

    if (standardCheck.rows.length === 0) {
      return res.status(400).json({ message: "Invalid standard_id. No matching standard found." });
    }

    // Check if the class name already exists for the given standard_id
    const classCheck = await pool.query(
      "SELECT * FROM classes WHERE name = $1 AND standard_id = $2",
      [name, standard_id]
    );

    if (classCheck.rows.length > 0) {
      return res.status(400).json({ message: "Class with this name already exists for the given standard." });
    }

    // Insert into classes table
    const result = await pool.query(
      "INSERT INTO classes (name, standard_id) VALUES ($1, $2) RETURNING *",
      [name, standard_id]
    );

    res.status(201).json({ message: "Class created successfully", class: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error creating class", error: (error as Error).message });
  }
};

export const getClasses = async (_req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM classes");
  res.json(result.rows);
};

export const updateClass = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, standard_id } = req.body;

  try {
    const result = await pool.query(
      "UPDATE classes SET name = $1, standard_id = $2 WHERE id = $3 RETURNING *",
      [name, standard_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class updated successfully", class: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error updating class", error: (error as Error).message });
  }
};


export const deleteClass = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM classes WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting class", error: (error as Error).message });
  }
};