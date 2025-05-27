import express from "express";
import { userRouter } from "./routes/user-route";
import { connectDatabase } from "./database/database";
import "dotenv/config"
const app = express();
connectDatabase();
app.use(express.json());
app.use(userRouter);
app.listen(process.env.PORT ?? 8080, () => console.log(`api on`));