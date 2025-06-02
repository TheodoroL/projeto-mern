import { Request, Response } from "express";
import { AuthLogin, AuthLoginSchema } from "./dtos/auth-request-login-dto";
import { AuthService } from "../services/AuthService";
import { compare } from "bcrypt";
import { UserModel } from "../model/User";

export class AuthController {
    public static async login(
        req: Request<{}, {}, AuthLogin>,
        res: Response
    ): Promise<void> {
        const { success, error, data } = AuthLoginSchema.safeParse(req.body);

        if (!success) {
            res.status(400).json({
                error: "Dados inválidos",
                issues: error.format(),
            });
            return;
        }
        const { email, password } = data;

        try {
            const user: UserModel | null = await AuthService.loginService(email);

            if (!user) {
                res.status(404).json({ error: "Usuário não encontrado" });
                return;
            }
            const isPasswordValid = await compare(password, user.password);

            if (!isPasswordValid) {
                res.status(401).json({ error: "E-mail ou senha inválidos" });
                return;
            }

            const token: string = AuthService.generateToken(user.id);

            res.status(200).json({ token });
        } catch (error) {
            console.error("Erro no login:", error);
            res.status(500).json({ error: "Erro interno ao tentar realizar login" });
        }
    }
}
