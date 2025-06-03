import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import { UserModel } from "../model/User";

export class GlobalMiddleware {
    static validId(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        const idUser = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(idUser)) {
            res.status(400)
                .send({
                    message: "ID do usuário invalido"
                });
            return;
        }
        req.id = idUser;
        next();
    }
    static async validUser(req: Request, res: Response, next: NextFunction) {

        const findByUser: UserModel | null = await UserService.findById(req.id);
        if (!findByUser) {
            res.status(400)
                .send({
                    message: "Usuário não encontrado"
                });
            return;
        }
        req.user = findByUser;
        next();
    }
}