"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocument = void 0;
const authswagger_1 = require("./authswagger");
const classswagger_1 = require("./classswagger");
const marksswagger_1 = require("./marksswagger");
const standerdswagger_1 = require("./standerdswagger");
const studentswagger_1 = require("./studentswagger");
const subjectswagger_1 = require("./subjectswagger");
exports.swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "School Management API",
        version: "1.0.0",
        description: "API documentation for managing students, subjects, and marks."
    },
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            }
        }
    },
    // security: [
    //   {
    //     BearerAuth: []
    //   }
    // ],
    servers: [
        {
            url: "http://localhost:3000",
            description: "Local development server"
        }
    ],
    paths: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, authswagger_1.authswgger), classswagger_1.classswagger), marksswagger_1.marksSwagger), standerdswagger_1.standardSwagger), studentswagger_1.studentSwagger), subjectswagger_1.subjectSwagger)
};
