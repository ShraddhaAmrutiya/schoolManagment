"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subject_controller_1 = require("../controllers/subject.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/add", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorize)(["admin", "principal", "teacher"]), subject_controller_1.addsubject);
router.delete("/delete/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorize)(["admin", "principal", "teacher"]), subject_controller_1.deletesubject);
router.put("/update/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorize)(["admin", "principal", "teacher"]), subject_controller_1.updatesubjects);
router.get("/get", auth_middleware_1.verifyToken, subject_controller_1.getsubjects);
exports.default = router;
