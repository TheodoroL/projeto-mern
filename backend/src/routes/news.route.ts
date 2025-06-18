import { Router } from "express";
import { NewsController } from "../controllers/newsController";
import { AuthMiddleware } from "../middlewares/auth-middleware";

export const newsRouter: Router = Router();

newsRouter.post("/", AuthMiddleware.validToken, NewsController.create);
newsRouter.get("/", NewsController.getAll);
newsRouter.get("/top", NewsController.topNews);