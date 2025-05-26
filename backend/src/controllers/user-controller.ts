import { Request, Response } from "express";

export class UserController {

    public static soma(req: Request, res: Response): void {
        const randomNumber = Math.floor(Math.random() * 10);
        const isPar: boolean = randomNumber % 2 === 0
        res.send({ result: randomNumber, par: isPar });
    }
}