import { Request, Response, NextFunction } from "express";
import { NewsService } from "../services/newsService";
import { NewsPageRequestSchema } from "../controllers/dtos/news-request-dto";
export class NewsMiddleware {
    public static async validNewsPage(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { success, data } = NewsPageRequestSchema.safeParse(req.query);

        const limit = success ? data.limit : 5;
        const offset = success ? data.offset : 0;
        const rawsNews = await NewsService.getAllService(limit, offset);
        const currentUrl = req.baseUrl;
        const nextNumber: number = limit + offset;
        const total = await NewsService.countNews();
        const nextUrl: string | null = nextNumber < total ? `${currentUrl}?limit=${limit}&offset=${nextNumber}` : null;
        const previous: number | null = offset - limit < 0 ? null : offset - limit;
        const previousUrl: string | null = previous !== null ? `${currentUrl}?limit=${limit}&offset=${previous}` : previous;
        if (!rawsNews) {
            res.status(200).send([]);
            return;
        }
        req.rawsNews = rawsNews;
        req.nextUrl = nextUrl;
        req.previousUrl = previousUrl;
        req.total = total;
        req.offset = offset;
        req.limit = limit;
        next();
    }

}