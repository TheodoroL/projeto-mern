import { UserModel } from "../model/User";
import { UserModelMongoose } from "../schema/user-schema";
export class AuthService {
    public static async loginService(email: string): Promise<UserModel> {
        const user = await UserModelMongoose.findOne({ email }).select("+password");
        if (!user) {
            throw new Error("user not found");
        }
        return user;
    }
}