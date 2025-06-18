import { UserModel } from "../../model/User";

declare global {
    namespace Express {
        interface Request {
            id: string;
            user: UserModel;
            rawsNews: News[],
            nextUrl: string | null;
            previousUrl: string | null;
            total: number;
            offset: number;
            limit: number;
        }
    }
}
export { }