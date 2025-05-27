import { Request, Response } from "express";
import type { UserRequestDTO } from "./dtos/user-request-dto";
import { UserResponseDTO } from "./dtos/user-response-dto";
import { createUser } from "../services/user-service";

export class UserController {
    public static async create(req: Request<{}, {}, UserRequestDTO>, res: Response<UserResponseDTO | any>): Promise<void> {
        const { email, password, avatar, background, name, username } = req.body;

        if (!email || !password || !avatar || !background || !name || !username) {
            res.status(400).send({
                error: "impossivel criar a conta"
            })
            return;
        }
        try {
            const createdUser = await createUser({
                avatar,
                background,
                password,
                email,
                username,
                name
            });

            if (!createdUser) {
                res.status(400).send({
                    error: "impossivel criar a conta"
                })
                return;
            }
            res.status(201).send({
                id: createdUser._id,
                name,
                username,
                email,
                avatar,
                background
            });
        } catch {
            res.status(409).send({
                message: "usuário já existe"
            })
        }
    }
}