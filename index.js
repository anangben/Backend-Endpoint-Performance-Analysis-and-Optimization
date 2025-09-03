import express from "express";
import config from "./utils/config.js";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";
import { swaggerSpec, swaggerUiMiddleware } from "./utils/swagger.js";
import cors from "cors";

//Make database connection
await mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("Connected!"));

// Create an express app
const app = express();

//Use global middlewares
app.use(express.json());

//Cors configurations
app.use(
  cors({
    origin: "https://backend-endpoint-performance-analysis.onrender.com",
  })
);
// Swagger docs
app.use(
  "/api-docs",
  swaggerUiMiddleware.serve,
  swaggerUiMiddleware.setup(swaggerSpec)
);

//User route
app.use("/api/v1", userRouter);

const port = config.PORT || 5000;

// Listen for incoming request
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
