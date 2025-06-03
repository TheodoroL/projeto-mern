import { News } from "../model/News";
import { newsModelMonoogse } from "../schema/news-schema";

export class NewsService {
    public static async createNews(body: News) {
        return await newsModelMonoogse.create({ ...body });
    }
    public static async getAllService(): Promise<News[] | null> {
        return await newsModelMonoogse.find();
    }
}