import { Request, Response,NextFunction } from "express";
import { pool } from "../modelse/db.modeles";

export const createStandard = async (req: Request, res: Response) => {
  try {
    console.log("🟢 Received request to create standard"); // Debugging log

    const { name } = req.body;

    if (!name) {
      console.log("🔴 Missing 'name' field in request"); // Debugging log
      return res.status(400).json({ message: "Name is required" });
    }

    console.log("🟢 Inserting into database..."); // Debugging log
    const result = await pool.query(
      "INSERT INTO standards (name) VALUES ($1) RETURNING *",
      [name]
    );

    console.log("✅ Standard created:", result.rows[0]); // Debugging log
    res.status(201).json({ message: "Standard created successfully", standard: result.rows[0] });

  } catch (error) {
    console.error("❌ Error in createStandard:", (error as Error).message);
    res.status(500).json({ message: "Error creating standard", error: (error as Error).message });
  }
};



export const getStandards = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM standards");

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No standards found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching standards", error: (error as Error).message });
  }
};



export const updateStanderd = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const result = await pool.query(
      "UPDATE standards SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Standard not found" });
    }

    res.status(200).json({ message: "Standard updated successfully", standard: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error updating standard", error: (error as Error).message });
  }
};

export const deletestanderd = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }

    const result = await pool.query("DELETE FROM standards WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Standard not found" });
    }

    res.status(200).json({ message: "Standard deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting standard", error: (error as Error).message });
  }
};
