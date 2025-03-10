import { OpenAPIV3 } from "openapi-types";
import { authswgger } from "./authswagger";
import {classswagger} from "./classswagger"
import {marksSwagger} from "./marksswagger"
import{standardSwagger} from "./standerdswagger"
import {studentSwagger} from "./studentswagger"
import{subjectSwagger} from "./subjectswagger"
export const swaggerDocument: OpenAPIV3.Document = {
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
  paths: {
    ...authswgger,
    ...classswagger,
    ...marksSwagger,
    ...standardSwagger,
    ...studentSwagger,
    ...subjectSwagger
  } 
};
