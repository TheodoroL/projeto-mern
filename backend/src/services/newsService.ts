import { News } from "../model/News";
import { newsModelMonoogse } from "../schema/news-schema";

export class NewsService {
    public static async createNews(body: News) {
        return await newsModelMonoogse.create({ ...body });
    }
    public static async getAllService(limit: number, offset: number) {
        return await newsModelMonoogse.find()
            .sort({ _id: -1 })
            .skip(offset)
            .limit(limit)
            .lean();
        ;
    }
    public static async countNews(): Promise<number> {
        return await newsModelMonoogse.countDocuments();
    }
}