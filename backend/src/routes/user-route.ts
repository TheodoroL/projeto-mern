import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { GlobalMiddleware } from "../middlewares/global-middleware";
export const userRouter = Router();

userRouter.post("/", UserController.create);
userRouter.get("/", UserController.findAllUsers);
userRouter.get("/:id", GlobalMiddleware.validId, GlobalMiddleware.validUser, UserController.findById);
userRouter.patch("/:id", GlobalMiddleware.validId, GlobalMiddleware.validUser, UserController.update);