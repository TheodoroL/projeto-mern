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
            .lean<News[]>();
        ;
    }
    public static async countNews(): Promise<number> {
        return await newsModelMonoogse.countDocuments();
    }
    // busca o top news, ou seja, a mais recente
    public static async topNews(): Promise<News | null> {
        const news = await newsModelMonoogse.findOne()
            .sort({ _id: -1 })
            .populate({
                path: "users",
                select: "name _id  username email avatar background",
            })
            .lean<News>();

        return news;
    }
    public static async getById(id: string): Promise<News | null> {
        return await newsModelMonoogse.findById(id)
            .populate({
                path: "users",
                select: "name _id  username email avatar background",
            })
            .lean<News>();
    }
    // vai buscar as noticias que contem o termo title
    // o termo title pode ser uma string vazia, nesse caso, retorna todas as noticias
    public static async seachByTitle(title: string): Promise<News[] | null> {
        return await newsModelMonoogse.find({ title: { $regex: title, $options: "i" } })
            .sort({ _id: -1 })
            .populate({
                path: "users",
                select: "name _id  username email avatar background",
            })
            .lean<News[]>();
    }
}