import express from "express";
import { createClass, getClasses,updateClass,deleteClass } from "../controllers/class.controller";
import { verifyToken, authorize } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/create", verifyToken, authorize(["admin", "principal","teacher"]), createClass);
router.put("/update/:id", verifyToken, authorize(["admin", "principal","teacher"]), updateClass);
router.delete("/delete/:id", verifyToken, authorize(["admin", "principal", "teacher"]), deleteClass);
router.get("/get", verifyToken, getClasses);

export default router;
