import { z } from "zod";

export const NewsRequestSchema = z.object({
    title: z.string().min(1, "O título é obrigatório"),
    banner: z.string().url("O banner deve ser uma URL válida"),
    text: z.string().min(1, "O texto da notícia é obrigatório"),
});

export const NewsPageRequestSchema = z.object({
    limit: z.coerce.number(),
    offset: z.coerce.number()
})

export const newsQueryTitleSchema = z.object({
    title: z.string().min(1, "O título é obrigatório"),
}
)
export const newsUpdateRequestSchema = z.object({
    title: z.string().min(1, "O título é obrigatório").optional(),
    banner: z.string().url("O banner deve ser uma URL válida").optional(),
    text: z.string().min(1, "O texto da notícia é obrigatório").optional(),
});

export const newsCommentRequestSchema = z.object({
    comment: z.string().min(1, "O comentário é obrigatório"),
});

export type NewsRequestDTO = z.infer<typeof NewsRequestSchema>;
export type NewsPageRequestSDTO = z.infer<typeof NewsPageRequestSchema>;
export type newsUpdateRequestSchema = z.infer<typeof newsUpdateRequestSchema>;