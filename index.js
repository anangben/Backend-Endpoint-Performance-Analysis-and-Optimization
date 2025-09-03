import express from "express";
import config from "./utils/config.js";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";

//Make database connection
await mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("Connected!"));

// Create an express app
const app = express();

//Use global middlewares
app.use(express.json());

//User route
app.use("/api/v1", userRouter);

const port = config.PORT || 5000;

// Listen for incoming request
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
