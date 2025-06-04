import { Request, Response } from "express";
import { NewsRequestDTO, NewsRequestSchema } from "./dtos/news-request-dto";
import { NewsService } from "../services/newsService";
import { NewsResponseDTO } from "./dtos/news-response-dto";

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
    public static async getAll(req: Request, res: Response<NewsResponseDTO[] | null>): Promise<void> {
        const getAllNews = await NewsService.getAllService();
        if (!getAllNews) {
            res.status(200).send(getAllNews);
            return;
        }

        const newsResponse: NewsResponseDTO[] = getAllNews.map(element => {
            return {
                title: element.title,
                text: element.text,
                banner: element.banner,
                user: element.users,
                coments: element.coments,
                likes: element.likes
            }
        });


        res.status(200).send(newsResponse);
    }
}