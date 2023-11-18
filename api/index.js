import express from 'express';
import cors from 'cors';
import tarefasRoutes from "./routes/tarefas.js";



const app = express();

app.use(express.json());
app.use(cors());

app.use("/", tarefasRoutes);

app.listen(8800);
