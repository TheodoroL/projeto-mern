import express from "express";
import { userRouter } from "./routes/user-route";

const app = express();
app.use(userRouter);
app.listen(process.env.PORT ?? 8080, () => console.log(`api on`));