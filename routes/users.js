import { Router } from "express";
import { registerUser_old } from "../controllers/users_old.js";
import { registerUser_new } from "../controllers/users_new.js";

const userRouter = Router();

//User Registration Routes
userRouter.post("/register-old", registerUser_old);
userRouter.post("/register-new", registerUser_new);

export default userRouter;
