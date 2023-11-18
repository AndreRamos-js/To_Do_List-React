import express from 'express';
import { getTarefas, addTarefa, updateTarefa, deleteTarefa } from '../controllers/tarefa.js';

const router = express.Router();

router.get("/", getTarefas);

router.post("/", addTarefa);

router.put("/:id", updateTarefa);

router.delete("/:id", deleteTarefa);

export default router;
