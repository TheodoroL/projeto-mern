import { News } from "../model/News";
import { newsModelMonoogse } from "../schema/news-schema";
import { newsUpdateRequestSchema } from "../controllers/dtos/news-request-dto";

export class NewsService {
    public static async createNews(body: News) {
        return await newsModelMonoogse.create({
            banner: body.banner,
            coments: body.coments,
            likes: body.likes,
            text: body.text,
            title: body.title,
            users: body.users._id
        });
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

    public static async getByUserId(userId: string): Promise<News[] | null> {
        return await newsModelMonoogse.find({ users: userId })
            .sort({ _id: -1 })
            .populate({
                path: "users",
                select: "username avatar"
            })
            .lean<News[]>();
    }
    public static async updateNews(id: string, { title, text, banner }: newsUpdateRequestSchema): Promise<News | null> {
        return await newsModelMonoogse.findOneAndUpdate({ _id: id }, {
            title, text, banner
        }).populate({
            path: "users",
            select: "username avatar"
        })
            .lean<News>();
    }
    public static async deleteNews(id: string): Promise<News | null> {
        return await newsModelMonoogse.findOneAndDelete({ _id: id })
    }
    public static async likeNews(id: string, userId: string): Promise<News | null> {
        // Atualiza a notícia adicionando um like do usuário, somente se ele ainda não tiver curtido
        return await newsModelMonoogse.findOneAndUpdate({
            _id: id, // Busca a notícia pelo id
            "likes.userId": { $ne: userId } // Garante que o usuário ainda não curtiu
        }, {
            $push: { likes: { userId, created: new Date() } } // Adiciona o like do usuário com a data atual
        })
    }
    public static async unlikeNews(id: string, userId: string): Promise<News | null> {
        // Atualiza a notícia removendo o like do usuário, somente se ele já tiver curtido
        return await newsModelMonoogse.findOneAndUpdate({
            _id: id, // Busca a notícia pelo id
            "likes.userId": userId // Garante que o usuário já curtiu
        }, {
            $pull: { likes: { userId } } // Remove o like do usuário
        });
    }
    public static async commentNews(id: string, userId: string, comment: string): Promise<News | null> {
        const idComent = Math.floor(Date.now() * Math.random()).toString(36);

        return await newsModelMonoogse.findOneAndUpdate(
            { _id: id },
            { $push: { coments: { idComent, userId, comment, created: new Date() } } }
        )

    }
    public static async deleteComment(id: string, commentId: string, userId: string): Promise<News | null> {
        return await newsModelMonoogse.findOneAndUpdate(
            {
                _id: id,
                "coments.idComent": commentId,
                "coments.userId": userId

            },
            { $pull: { coments: { idComent: commentId, userId } } }
        );
    }
} 