import express from 'express';
import tarefasRoutes from "./routes/tarefas.js";

const app = express();
const port = process.env.PORT || 8800;

app.use(express.json());

app.use("/", tarefasRoutes);

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});