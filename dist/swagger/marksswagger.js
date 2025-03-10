"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securitySchemes = exports.marksSwagger = void 0;
exports.marksSwagger = {
    "/marks": {
        post: {
            summary: "Add student marks",
            tags: ["Marks"],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                student_id: { type: "integer", example: 1 },
                                subject_id: { type: "integer", example: 101 },
                                marks: { type: "integer", minimum: 0, maximum: 100, example: 85 },
                            },
                            required: ["student_id", "subject_id", "marks"],
                        },
                    },
                },
            },
            responses: {
                "201": {
                    description: "Marks added successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Marks added successfully" },
                                    marks: {
                                        type: "object",
                                        properties: {
                                            id: { type: "integer", example: 1 },
                                            student_id: { type: "integer", example: 1 },
                                            subject_id: { type: "integer", example: 101 },
                                            marks: { type: "integer", example: 85 },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                "400": {
                    description: "Invalid input data",
                },
                "404": {
                    description: "Student or Subject not found",
                },
                "500": {
                    description: "Server error",
                },
            },
        },
    },
    "/marks/{roll_number}": {
        get: {
            summary: "Get student marks by roll number",
            tags: ["Marks"],
            security: [{ tokenAuth: [] }],
            parameters: [
                {
                    name: "roll_number",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "The roll number of the student",
                },
            ],
            responses: {
                "200": {
                    description: "Marks retrieved successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    student: {
                                        type: "object",
                                        properties: {
                                            id: { type: "integer", example: 1 },
                                            name: { type: "string", example: "John Doe" },
                                            roll_number: { type: "string", example: "A123" },
                                        },
                                    },
                                    marks: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                subject: { type: "string", example: "Mathematics" },
                                                marks: { type: "integer", example: 85 },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                "404": {
                    description: "Student not found",
                },
                "500": {
                    description: "Server error",
                },
            },
        },
    },
};
exports.securitySchemes = {
    securitySchemes: {
        tokenAuth: {
            type: "apiKey",
            in: "header",
            name: "token",
        },
    },
};
