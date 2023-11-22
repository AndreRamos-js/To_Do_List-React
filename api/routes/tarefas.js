import express from 'express';
import { getTarefas, addTarefa, updateTarefa, deleteTarefa, concluirTarefa, iniciarTarefa } from '../controllers/tarefa.js';

const router = express.Router();

router.get("/", getTarefas);

router.post("/", addTarefa);

router.put("/:id", updateTarefa);

router.delete("/:id", deleteTarefa);

router.put("/concluir/:id", concluirTarefa);

router.put("/iniciar/:id", iniciarTarefa);

export default router;
