import express from "express";
import { createStandard, getStandards,updateStanderd,deletestanderd } from "../controllers/standerd.controller"
import { verifyToken, authorize } from "../middleware/auth.middleware"

const router = express.Router();
console.log("✅ Standard Routes Loaded"); // Debugging log

router.post("/crerate", verifyToken, authorize(["admin", "principal","teacher"]), createStandard);
// router.post("/crerate",  createStandard);
router.put ("/update/:id", verifyToken, authorize(["admin", "principal","teacher"]), updateStanderd);
router.delete("/delete/:id", verifyToken, authorize(["admin", "principal", "teacher"]), deletestanderd);
router.get("/get", verifyToken, getStandards);

export default router;
