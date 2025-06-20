import { Router } from "express";
import { NewsController } from "../controllers/newsController";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { NewsMiddleware } from "../middlewares/news-middleware";

export const newsRouter: Router = Router();

newsRouter.post("/", AuthMiddleware.validToken, NewsController.create);
newsRouter.get("/", NewsMiddleware.validNewsPage, NewsController.getAll);
newsRouter.get("/top", NewsController.topNews);
newsRouter.get("/byuser", AuthMiddleware.validToken, NewsController.byUser);
newsRouter.get("/search", NewsController.seachByTitle);
newsRouter.get("/:id", AuthMiddleware.validToken, NewsController.getById);
newsRouter.patch("/:id", AuthMiddleware.validToken, NewsMiddleware.validNewsId, NewsController.updateNews);
newsRouter.patch("/like/:id", AuthMiddleware.validToken, NewsMiddleware.validNewsId, NewsController.likeNews);
newsRouter.delete("/:id", AuthMiddleware.validToken, NewsMiddleware.validNewsId, NewsController.deleteNews);