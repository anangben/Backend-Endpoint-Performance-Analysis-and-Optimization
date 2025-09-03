import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Registration API",
      version: "1.0.0",
      description:
        "API documentation for User Registration endpoints (old vs new flow).",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1", // Localhost URL
      },
      {
        url: "https://backend-endpoint-performance-analysis.onrender.com/api/v1", // Render URL
      },
    ],
  },
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
export const swaggerUiMiddleware = swaggerUi;
