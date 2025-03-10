"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controllers/student.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/add", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorize)(["admin", "principal", "teacher"]), student_controller_1.addStudent);
router.delete("/delete/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorize)(["admin", "principal", "teacher"]), student_controller_1.deletestudent);
router.put("/update/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorize)(["admin", "principal", "teacher"]), student_controller_1.updateStudent);
router.get("/get", auth_middleware_1.verifyToken, student_controller_1.getStudents);
exports.default = router;
