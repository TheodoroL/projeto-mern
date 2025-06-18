import { UserModel } from "./User";

export type News = {
    _id?: string; // ID do Mongoose
    title: string;
    banner: string;
    text: string;
    createAt?: Date; // opcional, pois o Mongoose define
    users: UserModel;   // ID do usuário
    likes: any[];
    coments: any[];

}

