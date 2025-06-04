import { z } from "zod";
export const NewsRequestSchema = z.object({
    title: z.string().min(1, "O título é obrigatório"),
    banner: z.string().url("O banner deve ser uma URL válida"),
    text: z.string().min(1, "O texto da notícia é obrigatório"),
    user: z.string().uuid(),
    likes: z.array(z.any()).default([]),
    coments: z.array(z.any()).default([])
});

export type NewsResponseDTO = z.infer<typeof NewsRequestSchema>;
