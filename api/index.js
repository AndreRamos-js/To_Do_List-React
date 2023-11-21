import express from 'express';
import cors from 'cors';
import tarefasRoutes from './routes/tarefas.js';

const app = express();
const port = process.env.PORT || 8800;

// Configuração do middleware CORS
const corsOptions = {
  origin: 'https://to-do-list-9wl3.vercel.app/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', tarefasRoutes);

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
