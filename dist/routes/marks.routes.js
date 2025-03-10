"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const marks_controller_1 = require("../controllers/marks.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorize)(["admin", "principal", "teacher"]), marks_controller_1.addMarks);
router.get("/{roll_number}", auth_middleware_1.verifyToken, marks_controller_1.getStudentMarks);
exports.default = router;
