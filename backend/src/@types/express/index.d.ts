import { UserModel } from "../../model/User";

declare global {
    namespace Express {
        interface Request {
            id: string;
            user: UserModel;
        }
    }
}
export { }