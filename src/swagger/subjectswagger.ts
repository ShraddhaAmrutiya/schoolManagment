import { OpenAPIV3 } from "openapi-types";

export const subjectSwagger: OpenAPIV3.PathsObject = {
  "/subjects/add": {
    post: {
      summary: "Create a new subject",
      tags: ["subjects"],
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Science" },
              },
              required: ["name"],
            },
          },
        },
      },
      responses: {
        "201": {
          description: "subject created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer", example: 1 },
                  name: { type: "string", example: "10th Grade" },
                },
              },
            },
          },
        },
      },
    },},
    "/subjects/get": {
      get: {
        summary: "Get all subjects",
        tags: ["subjects"],
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "List of standards",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer", example: 1 },
                      name: { type: "string", example: "Science" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  "/subjects/update/{id}": {
    put: {
      summary: "Update a subject",
      tags: ["subjects"],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          example: 1,
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Maths" },
              },
              required: ["name"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "subject updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Standard updated successfully" },
                  standard: {
                    type: "object",
                    properties: {
                      id: { type: "integer", example: 1 },
                      name: { type: "string", example: "Maths" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }},
    "/subjects/delete/{id}": {
    delete: {
      summary: "Delete a subject",
      tags: ["subjects"],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          example: 1,
        },
      ],
      responses: {
        "200": {
          description: "subject deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "subject deleted successfully" },
                },
              },
            },
          },
        },
      },
    },
  },
};
