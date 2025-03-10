"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const class_routes_1 = __importDefault(require("./routes/class.routes"));
const standerd_routes_1 = __importDefault(require("./routes/standerd.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const subject_routes_1 = __importDefault(require("./routes/subject.routes"));
const marks_routes_1 = __importDefault(require("./routes/marks.routes"));
const migrations_1 = require("./db/migrations");
const swaggersetup_1 = require("./swagger/swaggersetup");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, swaggersetup_1.setupSwagger)(app);
(0, migrations_1.createTables)().then(() => {
    console.log("Database initialized.");
}).catch((err) => {
    console.error("Database initialization failed:", err);
});
app.use("/auth", auth_routes_1.default);
app.use("/classes", class_routes_1.default);
app.use("/standards", standerd_routes_1.default);
app.use("/students", student_routes_1.default);
app.use("/subjects", subject_routes_1.default);
app.use("/marks", marks_routes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error for debugging
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err : undefined,
    });
});
app.listen(3000, () => console.log("Server running on port 3000"));
