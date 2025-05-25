import express, { Request, Response } from "express";

const app = express();
app.get("/", (req: Request, res: Response) => {
    res.send("ola");
})

app.listen(process.env.PORT ?? 8080, () => console.log(`api on na porta ${process.env.PORT}`));