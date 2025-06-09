import { z } from "zod";
export const NewsRequestSchema = z.object({
    title: z.string().min(1, "O título é obrigatório"),
    banner: z.string().url("O banner deve ser uma URL válida"),
    text: z.string().min(1, "O texto da notícia é obrigatório"),
    user: z.string().uuid(),
    likes: z.array(z.any()).default([]),
    coments: z.array(z.any()).default([])
});
export const NewsPaginatedResponseSchema = z.object({
    nextUrl: z.string().url().nullable(),
    previousUrl: z.string().url().nullable(),
    limit: z.number(),
    offset: z.number(),
    total: z.number(),
    newsResponse: z.array(NewsRequestSchema)
}

)

export type NewsResponseDTO = z.infer<typeof NewsRequestSchema>;
export type NewsPaginatedResponseDTO = z.infer<typeof NewsPaginatedResponseSchema>