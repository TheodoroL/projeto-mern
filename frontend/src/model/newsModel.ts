export type NewsRequest = {
    id: string;
    title: string;
    text: string;
    banner: string;
    user: string;
    coments: []; // ou você pode definir um tipo mais específico se souber a estrutura dos comentários
    likes: [];
}

export type News = {
    id: string;
    title: string;
    text: string;
    banner: string;
    user: string;
    coments: number // ou você pode definir um tipo mais específico se souber a estrutura dos comentários
    likes: number;
}
