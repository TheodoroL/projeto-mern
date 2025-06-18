import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { UserService } from "../services/userService";
import { UserModel } from "../model/User";

export class AuthMiddleware {
    public static async validToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { authorization } = req.headers;

        if (!authorization) {
            res.status(401).send({ message: "usuário não permitido" });
            return;
        }

        const [schema, token] = authorization.split(" ");

        if (schema !== "Bearer" || !token) {
            res.status(401).send({ message: "usuário não permitido" });
            return;
        }

        try {
            const decoded = verify(token, process.env.PASSWORD_JWT) as JwtPayload;

            const user: UserModel | null = await UserService.findById(decoded.id);
            if (!user) {
                res.status(401).send({ message: "token inválido" });
                return;
            }

            req.id = user.id;
            next();
        } catch (error: any) {
            res.status(401).send({ message: error.message });
            return;
        }
    }
}
