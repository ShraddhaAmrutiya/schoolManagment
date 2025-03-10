"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classswagger = void 0;
exports.classswagger = {
    "/classes/create": {
        post: {
            summary: "Create a new class",
            tags: ["Classes"],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string", example: "12" },
                                standard_id: { type: "integer", example: 1 }
                            },
                            required: ["name", "standard_id"]
                        },
                    },
                },
            },
            responses: {
                "201": {
                    description: "Class created successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: { type: "integer", example: 1 },
                                    name: { type: "string", example: "12" },
                                    standard_id: { type: "integer", example: 1 },
                                },
                            },
                        },
                    },
                },
            },
        }
    },
    "/classes/get": {
        get: {
            summary: "Get all classes",
            tags: ["Classes"],
            security: [{ BearerAuth: [] }],
            responses: {
                "200": {
                    description: "List of classes",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer", example: 1 },
                                        name: { type: "string", example: "12" },
                                        standard_id: { type: "integer", example: 1 },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "/classes/update/{id}": {
        put: {
            summary: "Update a class",
            tags: ["Classes"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string", example: "Updated Class Name" },
                                standard_id: { type: "integer", example: 2 },
                            },
                        },
                    },
                },
            },
            responses: {
                "200": {
                    description: "Class updated successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Class updated successfully" },
                                    class: {
                                        type: "object",
                                        properties: {
                                            id: { type: "integer", example: 1 },
                                            name: { type: "string", example: "Updated Class Name" },
                                            standard_id: { type: "integer", example: 2 },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                "404": {
                    description: "Class not found",
                },
            },
        },
    },
    "/classes/delete/{id}": {
        delete: {
            summary: "Delete a class",
            tags: ["Classes"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" },
                },
            ],
            responses: {
                "200": {
                    description: "Class deleted successfully",
                },
                "404": {
                    description: "Class not found",
                },
            },
        },
    }
};
