import { Router } from "express";
import { NewsController } from "../controllers/newsController";

export const newsRouter: Router = Router();

newsRouter.post("/", NewsController.create);
newsRouter.get("/", NewsController.getAll);