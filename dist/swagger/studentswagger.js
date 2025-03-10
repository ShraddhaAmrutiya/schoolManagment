"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSwagger = void 0;
exports.studentSwagger = {
    "/students/get": {
        get: {
            summary: "Get all students",
            tags: ["Students"],
            security: [{ BearerAuth: [] }],
            responses: {
                "200": {
                    description: "List of students",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer", example: 1 },
                                        name: { type: "string", example: "John Doe" },
                                        roll_number: { type: "string", example: "A1001" },
                                        standard_id: { type: "integer", example: 1 },
                                        class_id: { type: "integer", example: 2 },
                                        teacher_id: { type: "integer", example: 5 },
                                        school_id: { type: "integer", example: 3 }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/students/add": {
        post: {
            summary: "Add a student",
            tags: ["Students"],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string", example: "John Doe" },
                                roll_number: { type: "string", example: "A1001" },
                                standard_id: { type: "integer", example: 1 },
                                class_id: { type: "integer", example: 2 },
                                teacher_id: { type: "integer", example: 5 },
                                school_id: { type: "integer", example: 3 }
                            },
                            required: ["name", "roll_number", "standard_id", "class_id", "teacher_id", "school_id"]
                        }
                    }
                }
            },
            responses: {
                "201": {
                    description: "Student added successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Student registered successfully" },
                                    student: {
                                        type: "object",
                                        properties: {
                                            id: { type: "integer", example: 1 },
                                            name: { type: "string", example: "John Doe" },
                                            roll_number: { type: "string", example: "A1001" },
                                            password: { type: "string", example: "abc12345" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/students/update/{id}": {
        put: {
            summary: "Update a student",
            tags: ["Students"],
            security: [{ BearerAuth: [] }],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string", example: "John Doe" },
                                class_id: { type: "integer", example: 2 }
                            }
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Student updated successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Student updated successfully" },
                                    student: {
                                        type: "object",
                                        properties: {
                                            id: { type: "integer", example: 1 },
                                            name: { type: "string", example: "John Doe" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/students/delete/{id}": {
        delete: {
            summary: "Delete a student",
            tags: ["Students"],
            security: [{ BearerAuth: [] }],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
            responses: {
                "200": {
                    description: "Student deleted successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Student deleted successfully" }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
