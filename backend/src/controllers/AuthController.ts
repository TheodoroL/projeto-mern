import { Request, Response } from "express";
import { AuthLogin } from "./dtos/auth-request-login-dto";
import { AuthService } from "../services/AuthService";
import { compare } from "bcrypt";
import { UserModel } from "../model/User";
export class AuthController {
    public static async login(req: Request<{}, {}, AuthLogin>, res: Response): Promise<void> {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send("digite um email ou senha valida");
            return;
        }
        try {
            const isUser: UserModel = await AuthService.loginService(email);

            if (!isUser) {
                res.status(400).send("Usuário não encontrado");
                return;
            }

            const passwordIsValid = await compare(password, isUser.password);

            if (!passwordIsValid) {
                res.status(400).send("email ou senha invalida");
                return
            }
            res.status(200).send({
                email,
                message: "de bom"
            });
        }
        catch {
            res.status(404).send({ error: "email o senha invalida" });
        }
    }
}