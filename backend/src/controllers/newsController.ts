import { Request, Response } from "express";
import { NewsPageRequestSchema, NewsPageRequestSDTO, NewsRequestDTO, NewsRequestSchema } from "./dtos/news-request-dto";
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

        const getAllNews: News[] = rawsNews.map(news => ({
            title: news.title ?? '',
            banner: news.banner ?? '',
            text: news.text ?? '',
            createAt: news.createAt ?? new Date(),
            users: typeof news.users === 'string' ? news.users : news.users?.toString() ?? '',
            likes: news.likes ?? [],
            coments: news.coments ?? [],
        }));

        const newsResponse: NewsResponseDTO[] = getAllNews.map(news => ({
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
}