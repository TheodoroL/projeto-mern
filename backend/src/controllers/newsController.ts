import { Request, Response } from "express";
import { newsQueryTitleSchema, NewsRequestDTO, NewsRequestSchema, newsCommentRequestSchema } from "./dtos/news-request-dto";
import { NewsService } from "../services/newsService";
import { NewsResponseDTO, NewsPaginatedResponseDTO } from "./dtos/news-response-dto";
import { News } from "../model/News";
export class NewsController {
    public static async create(req: Request<{}, {}, NewsRequestDTO>, res: Response): Promise<void> {
        const { success, error, data } = NewsRequestSchema.safeParse(req.body);
        if (!success) {
            res.status(400).send({ error });
            return;
        }
        try {
            const newsData = await NewsService.createNews({
                banner: data.banner,
                coments: [],
                likes: [],
                text: data.text,
                title: data.title,
                users: req.user,
            });

            const newsResponse: NewsResponseDTO = {
                user: newsData._id.toString(),
                banner: newsData.banner!,
                text: newsData.text,
                title: newsData.title!,
                coments: newsData.coments,
                likes: newsData.likes

            }
            res.status(201).send({ newsResponse });
        } catch (e) {
            res.status(400).send({ error: "não foi possivel criar uma nova noticia" });
        }
    }
    public static async getAll(req: Request, res: Response<NewsPaginatedResponseDTO | []>): Promise<void> {
        const newsResponse: NewsResponseDTO[] = req.rawsNews.map(news => ({
            id: news._id,
            title: news.title,
            text: news.text,
            banner: news.banner,
            user: news.users,
            coments: news.coments,
            likes: news.likes
        }));
        res.status(200).send(
            {
                nextUrl: req.nextUrl,
                previousUrl: req.previousUrl,
                limit: req.limit,
                offset: req.offset,
                total: req.total,
                newsResponse
            }
        );
    }

    public static async topNews(req: Request, res: Response): Promise<void> {
        const news = await NewsService.topNews();
        if (!news) {
            res.status(404).send({ error: "Nenhuma notícia encontrada" });
            return;
        }
        const newsResponse: NewsResponseDTO = {
            id: news._id,
            user: news.users._id,
            banner: news.banner,
            text: news.text,
            title: news.title,
            coments: news.coments,
            likes: news.likes
        };
        res.status(200).send(newsResponse);
    }

    public static async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        if (!id) {
            res.status(400).send({ error: "ID da notícia é obrigatório" });
            return;
        }
        const news = await NewsService.getById(id);
        if (!news) {
            res.status(404).send({ error: "Notícia não encontrada" });
            return;
        }
        const newsResponse: NewsResponseDTO = {
            id: news._id,
            user: news.users._id,
            banner: news.banner,
            text: news.text,
            title: news.title,
            coments: news.coments,
            likes: news.likes
        };
        res.status(200).send(newsResponse);
    }

    public static async seachByTitle(req: Request, res: Response): Promise<void> {
        const { success, error, data } = newsQueryTitleSchema.safeParse(req.query);
        if (!success) {
            res.status(400).send({ error: error.message });
            return;
        }

        const news = await NewsService.seachByTitle(data.title);
        if (!news || news.length === 0) {
            res.status(404).send({ error: "Nenhuma notícia encontrada com esse título" });
            return;
        }

        const newsResponse: NewsResponseDTO[] = news.map(n => ({
            id: n._id,
            user: n.users._id,
            banner: n.banner,
            text: n.text,
            title: n.title,
            coments: n.coments,
            likes: n.likes
        }));
        res.status(200).send(newsResponse);
    }
    public static async byUser(req: Request, res: Response): Promise<void> {
        const news: News[] | null = await NewsService.getByUserId(req.user._id);
        if (!news || news.length === 0) {
            res.status(404).send({ error: "Nenhuma notícia encontrada para este usuário" });
            return;
        }
        const newsResponse: NewsResponseDTO[] = news.map(n => ({
            id: n._id,
            user: n.users._id,
            banner: n.banner,
            text: n.text,
            title: n.title,
            coments: n.coments,
            likes: n.likes
        }));
        res.status(200).send(newsResponse);
    }

    public static async updateNews(req: Request, res: Response): Promise<void> {
        const { success, error, data } = NewsRequestSchema.safeParse(req.body);
        if (!success) {
            res.status(400).send({ error });
            return;
        }
        try {
            const updatedNews = await NewsService.updateNews(req.id, data);
            if (!updatedNews) {
                res.status(404).send({ error: "Notícia não encontrada ou não atualizada" });
                return;
            }
            res.status(200).send({ message: "Notícia atualizada com sucesso", updatedNews });
        } catch (err) {
            res.status(500).send({ error: "Erro ao atualizar a notícia" });
        }
    }
    public static async deleteNews(req: Request, res: Response): Promise<void> {
        try {
            await NewsService.deleteNews(req.id);
            res.status(200).send({ message: "Notícia excluída com sucesso" });
        } catch (err) {
            res.status(500).send({ error: "Erro ao excluir a notícia" });
        }
    }
    public static async likeNews(req: Request, res: Response): Promise<void> {
        try {
            const likedNews = await NewsService.likeNews(req.id, req.user._id);
            if (!likedNews) {
                await NewsService.unlikeNews(req.id, req.user._id);
                res.status(200).send({ message: "Like da noticia tirado com sucesso!" });
                return;
            }
            res.status(200).send({ message: "Notícia curtida com sucesso!" });
        } catch (err) {
            res.status(500).send({ error: "Erro ao curtir a notícia" });
        }
    }
    public static async commentNews(req: Request, res: Response): Promise<void> {
        const { success, error, data } = newsCommentRequestSchema.safeParse(req.body);
        if (!success) {
            res.status(400).send({ error: error.message });
            return;
        }
        try {
            const updatedNews = await NewsService.commentNews(req.id, req.user._id, data.comment);
            if (!updatedNews) {
                res.status(404).send({ error: "Notícia não encontrada" });
                return;
            }
            res.status(200).send({ message: "Comentário adicionado com sucesso!" });
        } catch (err) {
            res.status(500).send({ error: "Erro ao adicionar comentário" });
        }
    }
    public static async deleteComment(req: Request, res: Response): Promise<void> {
        const { commentId } = req.params;
        if (!commentId) {
            res.status(400).send({ error: "ID da notícia e ID do comentário são obrigatórios" });
            return;
        }
        try {
            const deleteComment = await NewsService.deleteComment(req.id, commentId, req.user._id);
            if (!deleteComment) {
                res.status(404).send({ error: "Comentário não encontrado" });
                return;
            }
            res.status(200).send({ message: "Comentário excluído com sucesso!" });
        } catch (err) {
            res.status(500).send({ error: "Erro ao excluir comentário" });
        }
    }
}