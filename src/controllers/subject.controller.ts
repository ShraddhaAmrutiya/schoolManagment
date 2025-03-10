import { Request, Response } from "express";
import { pool } from "../modelse/db.modeles";

export const addsubject = async(req:Request, res:Response)=>{
    const {name}=req.body

    if (!name) {
        return res.status (400).json({message:"Subject name is required"})
    }

    try {
        const existingSubject=await pool.query('SELECT * FROM subjects WHERE name =$1',[name])
        if (existingSubject.rows.length>0) {
            return res.status(400).json({ message: "Subject already exists" });
        }

        const result=await pool.query(
            "INSERT INTO subjects (name) VALUES ($1) RETURNING *",[name]
        )
        res.status(201).json({message:"Subject added successfully",  subject:result.rows[0]})

    } catch (error) {
        res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
}

export const getsubjects =async(req:Request, res:Response)=>{
    try {
        const result =await pool.query("SELECT * FROM subjects")
        res.status(200).json({message:"subjects fatched successfully", subjects:result.rows})
    } catch (error) {
        res.status(500).json({ message: "Error deleting standerd", error: (error as Error).message });
    }
}

export const updatesubjects = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    try {

        const result = await pool.query(
            "UPDATE classes SET name = $1 WHERE id = $2 RETURNING *",
            [name, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Subject not found" });
        }

        console.log("✅ Subject updated:", result.rows[0]);
        res.status(200).json({ message: "Subject updated successfully", subject: result.rows[0] });

    } catch (error) {
        res.status(500).json({ message: "Error updating subject", error: (error as Error).message });
    }
};

export const deletesubject=async(req:Request, res:Response)=>{
    const {id}=req.params
    try {
        const result=await pool.query('DELETE FROM subjects WHERE id=$1 RETURNING *',[id]);

        if (result.rows.length===0) {
            return res.status(404).json({ message: "subject not found" });

        }
        res.status(200).json({ message: "subject deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting standerd", error: (error as Error).message });
    }
}
