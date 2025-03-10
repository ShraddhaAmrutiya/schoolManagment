"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authswgger = void 0;
exports.authswgger = {
    "/auth/register": {
        post: {
            summary: "Auth register",
            tags: ["Auth"],
            requestBody: {
                required: true,
                content: {
                    "application/x-www-form-urlencoded": {
                        schema: {
                            type: "object",
                            properties: {
                                username: { type: "string", example: "john_doe" },
                                email: { type: "string", format: "email", example: "john@example.com" },
                                name: { type: "string", example: "John Doe" },
                                phone: { type: "string", example: 1234567890 },
                                password: { type: "string", format: "password", example: "SecurePass@123" },
                                role: {
                                    type: "string",
                                    enum: ["principal", "teacher", "admin"],
                                    example: "teacher",
                                },
                                teacher_key: { type: "string", example: "TEACHER_SECRET_KEY" },
                            },
                            required: ["username", "email", "name", "phone", "password", "role"],
                        },
                    },
                },
            },
            responses: {
                "201": {
                    description: "User registered successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "User registered successfully" },
                                    user: {
                                        type: "object",
                                        properties: {
                                            id: { type: "integer", example: 1 },
                                            username: { type: "string", example: "john_doe" },
                                            email: { type: "string", example: "john@example.com" },
                                            role: { type: "string", example: "teacher" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "/auth/login": {
        post: {
            summary: "Auth login",
            tags: ["Auth"],
            requestBody: {
                required: true,
                content: {
                    "application/x-www-form-urlencoded": {
                        schema: {
                            type: "object",
                            properties: {
                                username: { type: "string", example: "john_doe" },
                                password: { type: "string", format: "password", example: "SecurePass@123" },
                            },
                            required: ["username", "password"],
                        },
                    },
                },
            },
            responses: {
                "201": {
                    description: "User login successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "User login successfully" },
                                    token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE3NDEzMzgxNzZ9._3uQFKfmcx5Wg1Dasyfw9xa9pPkmZVgsvxXtpxoqpeg" }
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
