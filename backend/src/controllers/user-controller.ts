import { Request, Response } from "express";
import type { UserRequestDTO } from "./dtos/user-request-dto";
import { UserResponsetDTO } from "./dtos/user-respnse-dto";

export class UserController {
    public static create(req: Request<{}, {}, UserRequestDTO>, res: Response<UserResponsetDTO | any>): void {
        const { email, password, avatar, background } = req.body;

        if (!email || !password) {
            res.status(400).send({
                error: "não foi possivel logar "
            })
            return;
        }
        res.status(201).send({
            email
            ,
            avatar,
            background
        });
    }
}