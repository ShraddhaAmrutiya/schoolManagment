import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { swaggerDocument } from "./swagger"; // Import the Swagger object

export const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
};
