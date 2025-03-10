import express from "express";
import{addMarks,getStudentMarks} from "../controllers/marks.controller"
import { verifyToken, authorize } from "../middleware/auth.middleware"
const router=express.Router();

router.post("/", verifyToken, authorize(["admin", "principal","teacher"]), addMarks);
router.get("/{roll_number}", verifyToken, getStudentMarks)
 

export default router;
