"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const standerd_controller_1 = require("../controllers/standerd.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
console.log("✅ Standard Routes Loaded"); // Debugging log
router.post("/crerate", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorize)(["admin", "principal", "teacher"]), standerd_controller_1.createStandard);
// router.post("/crerate",  createStandard);
router.put("/update/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorize)(["admin", "principal", "teacher"]), standerd_controller_1.updateStanderd);
router.delete("/delete/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorize)(["admin", "principal", "teacher"]), standerd_controller_1.deletestanderd);
router.get("/get", auth_middleware_1.verifyToken, standerd_controller_1.getStandards);
exports.default = router;
