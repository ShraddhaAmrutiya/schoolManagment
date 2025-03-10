"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const class_controller_1 = require("../controllers/class.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorize)(["admin", "principal", "teacher"]), class_controller_1.createClass);
router.put("/update/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorize)(["admin", "principal", "teacher"]), class_controller_1.updateClass);
router.delete("/delete/:id", auth_middleware_1.verifyToken, (0, auth_middleware_1.authorize)(["admin", "principal", "teacher"]), class_controller_1.deleteClass);
router.get("/get", auth_middleware_1.verifyToken, class_controller_1.getClasses);
exports.default = router;
