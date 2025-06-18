import { Request, Response } from "express";
import { NewsPageRequestSchema, NewsPageRequestSDTO, newsQueryTitleSchema, NewsRequestDTO, NewsRequestSchema } from "./dtos/news-request-dto";
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
                users: req.id,
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
        } catch {
            res.status(400).send({ error: "não foi possivel criar uma nova noticia" });
        }
    }
    public static async getAll(
        req: Request<{}, {}, {}, NewsPageRequestSDTO>,
        res: Response<NewsPaginatedResponseDTO | []>
    ): Promise<void> {
        const { success, data } = NewsPageRequestSchema.safeParse(req.query);

        const limit = success ? data.limit : 5;
        const offset = success ? data.offset : 0;
        const rawsNews = await NewsService.getAllService(limit, offset);
        const currentUrl = req.baseUrl;
        const next: number = limit + offset;
        const total = await NewsService.countNews()
        const nextUrl: string | null = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
        const previous: number | null = offset - limit < 0 ? null : offset - limit;
        const previousUrl: string | null = previous !== null ? `${currentUrl}?limit=${limit}&offset=${previous}` : previous;
        if (!rawsNews) {
            res.status(200).send([]);
            return;
        }

        const newsResponse: NewsResponseDTO[] = rawsNews.map(news => ({
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
                nextUrl,
                previousUrl,
                limit,
                offset,
                total,
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
            user: news.users,
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
            user: news.users,
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
            user: n.users,
            banner: n.banner,
            text: n.text,
            title: n.title,
            coments: n.coments,
            likes: n.likes
        }));
        res.status(200).send(newsResponse);
    }
    public static async byUser(req: Request, res: Response): Promise<void> {
        const userId: string = req.id;
        if (!userId) {
            res.status(400).send({ error: "ID do usuário é obrigatório" });
            return;
        }
        const news: News[] | null = await NewsService.getByUserId(userId);
        if (!news || news.length === 0) {
            res.status(404).send({ error: "Nenhuma notícia encontrada para este usuário" });
            return;
        }
        const newsResponse: NewsResponseDTO[] = news.map(n => ({
            id: n._id,
            user: n.users,
            banner: n.banner,
            text: n.text,
            title: n.title,
            coments: n.coments,
            likes: n.likes
        }));
        res.status(200).send(newsResponse);
    }

}