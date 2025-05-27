import { Request, Response } from "express";
import type { UserRequestDTO } from "./dtos/user-request-dto";
import { UserResponseDTO } from "./dtos/user-response-dto";
import { UserService } from "../services/user-service";
import { UserModel } from "../model/User";
import mongoose from "mongoose";

export class UserController {
    public static async findById(req: Request, res: Response) {
        const idUser = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(idUser)) {
            res.status(400)
                .send({
                    message: "ID do usuário invalido"
                });
            return;
        }
        const findByUser: UserModel | null = await UserService.findById(idUser);
        if (!findByUser) {
            res.status(400)
                .send({
                    message: "Usuário não encontrado"
                });
            return;
        }
        const responseDTO: UserResponseDTO = {
            id: findByUser.id!,
            avatar: findByUser.avatar,
            background: findByUser.background,
            email: findByUser.email,
            name: findByUser.name,
            username: findByUser.username
        }

        res.status(200).send(responseDTO);

    }
    public static async findAllUsers(req: Request, res: Response<UserResponseDTO[] | any>): Promise<void> {
        const allUsers = await UserService.findAll();
        if (allUsers.length === 0) {
            res.status(400).send({ message: "A lista de usuário está vazia" });
            return;
        }

        const allUsersDTOS: UserResponseDTO[] = allUsers.map(user => {
            return {
                id: user.id ?? "",
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                background: user.background,
            }
        });
        res.status(200).send(allUsersDTOS);
    }

    public static async create(req: Request<{}, {}, UserRequestDTO>, res: Response<UserResponseDTO | any>): Promise<void> {
        const { email, password, avatar, background, name, username } = req.body;

        if (!email || !password || !avatar || !background || !name || !username) {
            res.status(400).send({
                error: "impossivel criar a conta"
            })
            return;
        }
        try {
            const createdUser = await UserService.createUser({
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