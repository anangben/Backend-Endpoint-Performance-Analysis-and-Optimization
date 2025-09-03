import { Router } from "express";
import { registerUser_old } from "../controllers/users_old.js";
import { registerUser_new } from "../controllers/users_new.js";

const userRouter = Router();

/**
 * @openapi
 * /register-old:
 *   post:
 *     summary: Register a new user (old flow)
 *     description: Creates a new user using the old flow (2 DB writes, longer hashing, larger token).
 *     tags:
 *       - User Registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: Bernard
 *               lastname:
 *                 type: string
 *                 example: Adjetey
 *               email:
 *                 type: string
 *                 example: bernardadjetey@example.com
 *               password:
 *                 type: string
 *                 example: SecurePass123
 *     responses:
 *       201:
 *         description: Registration successful, verification email sent
 *       422:
 *         description: Validation error or user already exists
 */

/**
 * @openapi
 * /register-new:
 *   post:
 *     summary: Register a new user (optimized flow)
 *     description: Creates a new user using the optimized flow (1 DB write, faster hashing, shorter token).
 *     tags:
 *       - User Registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: Bernard
 *               lastname:
 *                 type: string
 *                 example: Adjetey
 *               email:
 *                 type: string
 *                 example: bernardadjetey@example.com
 *               password:
 *                 type: string
 *                 example: StrongPass456
 *     responses:
 *       201:
 *         description: Registration successful, verification email sent
 *       422:
 *         description: Validation error or user already exists
 */

//User Registration Routes
userRouter.post("/register-old", registerUser_old);
userRouter.post("/register-new", registerUser_new);

export default userRouter;
