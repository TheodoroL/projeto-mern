import { Request, Response } from "express";
import { UserRequestSchema, type UserRequestDTO } from "./dtos/user-request-dto";
import { UserResponseDTO } from "./dtos/user-response-dto";
import { UserService } from "../services/userService";

export class UserController {
    public static async findById(req: Request, res: Response) {
        const { _id, name, username, email, background, avatar } = req.user;
        const responseDTO: UserResponseDTO = {
            id: _id,
            avatar,
            background,
            email,
            name,
            username
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
                id: user._id ?? "",
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
        const { success, error, data } = UserRequestSchema.safeParse(req.body);
        if (!success) {
            res.status(400).send({
                ok: false,
                error: {
                    type: "validation",
                    info: error.errors,
                },
            });

            return;
        }
        try {
            const createdUser = await UserService.createUser({
                _id: "",
                ...data
            });

            if (!createdUser) {
                res.status(400).send({
                    error: "impossivel criar a conta"
                })
                return;
            }
            res.status(201).send({
                id: createdUser._id,
                name: createdUser.name,
                username: createdUser.username,
                email: createdUser.email,
                avatar: createdUser.avatar,
                background: createdUser.background
            });
        } catch {
            res.status(409).send({
                message: "usuário já existe"
            })
        }
    }
    public static async update(req: Request<{}, {}, UserRequestDTO>, res: Response) {
        const { email, password, avatar, background, name, username } = req.body;
        if (!email && !password && !avatar && !background && !name && !username) {

            res.status(400).send({
                error: "adiciona pelo menos uma informação para atualizar"
            })
            return;
        }

        await UserService.update({
            _id: req.user._id,
            name,
            username,
            email,
            password,
            avatar,
            background
        });

        res.status(200).send({ message: "atualizado com sucesso" });
    }
}