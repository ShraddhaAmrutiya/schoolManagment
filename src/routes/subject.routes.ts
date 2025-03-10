import express from "express";
import{addsubject,getsubjects,deletesubject,updatesubjects} from "../controllers/subject.controller"
import { verifyToken, authorize } from "../middleware/auth.middleware";

const router=express.Router();

router.post("/add", verifyToken, authorize(["admin", "principal", "teacher"]), addsubject);
router.delete("/delete/:id", verifyToken, authorize(["admin", "principal", "teacher"]), deletesubject);
router.put("/update/:id", verifyToken, authorize(["admin", "principal", "teacher"]), updatesubjects);
router.get("/get", verifyToken, getsubjects)



export default router;




