import { UserModel } from "../model/User";
import { UserModelMongoose } from "../schema/user-schema";


export class UserService {
    static async createUser(body: UserModel) {
        return await UserModelMongoose.create({
            ...body
        });
    }

    static async findAll(): Promise<UserModel[]> {
        return await UserModelMongoose.find();
    }

    static async findById(id: string): Promise<UserModel | null> {
        return await UserModelMongoose.findById(id);
    }
}