import { OpenAPIV3 } from "openapi-types";

export const standardSwagger: OpenAPIV3.PathsObject = {
  "/standards/crerate": {
    post: {
      summary: "Create a new standard",
      tags: ["Standards"],
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "10th Grade" },
              },
              required: ["name"],
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Standard created successfully",
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
    "/standards/get": {
      get: {
        summary: "Get all standards",
        tags: ["Standards"],
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
                      name: { type: "string", example: "10th Grade" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  "/standards/update/{id}": {
    put: {
      summary: "Update a standard",
      tags: ["Standards"],
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
                name: { type: "string", example: "11th Grade" },
              },
              required: ["name"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Standard updated successfully",
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
                      name: { type: "string", example: "11th Grade" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }},
    "/standards/delete/{id}": {
    delete: {
      summary: "Delete a standard",
      tags: ["Standards"],
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
          description: "Standard deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Standard deleted successfully" },
                },
              },
            },
          },
        },
      },
    },
  },
};
