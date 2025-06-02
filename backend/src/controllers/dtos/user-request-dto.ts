import { z } from "zod";

export const UserRequestSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  username: z.string().min(1, "Nome de usuário é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  avatar: z.string().url("Avatar deve ser uma URL válida"),
  background: z.string().url("Background deve ser uma URL válida"),
});

export type UserRequestDTO = z.infer<typeof UserRequestSchema>;