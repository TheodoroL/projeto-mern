import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export const authRoute: Router = Router();

authRoute.post("/login", AuthController.login);