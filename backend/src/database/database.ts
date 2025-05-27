import mongoose from "mongoose";

export async function connectDatabase() {
    try {
        await mongoose.connect(process.env.URL_DATABASE, {
            serverApi: { version: '1', strict: true, deprecationErrors: true }
        });
        console.log("MongoDB conectado");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        await mongoose.disconnect();
    }
}
