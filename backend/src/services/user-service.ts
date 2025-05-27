import { UserModel } from "../model/User";
import { UserModelMongoose } from "../schema/user-schema";
export const createUser = async (body: UserModel) => {
    return await UserModelMongoose.create({
        ...body
    });
}