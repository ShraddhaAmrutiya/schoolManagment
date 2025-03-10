import express from "express";
import { addStudent, getStudents , deletestudent,updateStudent} from "../controllers/student.controller";
import { verifyToken, authorize } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/add", verifyToken, authorize(["admin", "principal", "teacher"]), addStudent);
router.delete("/delete/:id", verifyToken, authorize(["admin", "principal", "teacher"]), deletestudent);
router.put("/update/:id", verifyToken, authorize(["admin", "principal", "teacher"]), updateStudent);
router.get("/get", verifyToken, getStudents);

export default router;
