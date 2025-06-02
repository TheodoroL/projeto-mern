import { UserModel } from "../model/User";
import { UserModelMongoose } from "../schema/user-schema";
import { sign } from "jsonwebtoken";
export class AuthService {
    public static async loginService(email: string): Promise<UserModel> {
        const user = await UserModelMongoose.findOne({ email }).select("+password");
        if (!user) {
            throw new Error("user not found");
        }
        return user;
    }
    public static generateToken(id: string) {
        return sign({ id: id }, process.env.PASSWORD_JWT, { expiresIn: 86400 });

    }
}