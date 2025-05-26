import { Router } from "express";
import { UserController } from "../controllers/user-controller";

export const userRouter = Router();

userRouter.post("/user", UserController.create);