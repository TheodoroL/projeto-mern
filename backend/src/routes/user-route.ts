import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { GlobalMiddleware } from "../middlewares/global-middleware";
export const userRouter = Router();

userRouter.post("/user", UserController.create);
userRouter.get("/user", UserController.findAllUsers);
userRouter.get("/user/:id", GlobalMiddleware.validId, GlobalMiddleware.validUser, UserController.findById);
userRouter.patch("/user/:id", GlobalMiddleware.validId, GlobalMiddleware.validUser, UserController.update);