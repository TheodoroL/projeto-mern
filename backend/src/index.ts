import express from "express";
import "dotenv/config"
import { userRouter } from "./routes/user.route";
import { connectDatabase } from "./database/database";
import { authRoute } from "./routes/auth.route";
import { newsRouter } from "./routes/news.route";

const app = express();
connectDatabase();
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRoute);
app.use("/news", newsRouter);
app.listen(process.env.PORT ?? 8080, () => console.log(`api on`));