import { db } from '../db.js';



export const getTarefas = (_, res) => {
    const q = "SELECT * FROM tarefas";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};


export const addTarefa = (req, res) => {
    const q = 
        'INSERT INTO tarefas(`titulo`, `descricao`, `status`, `tempo_estimado`) VALUES(?)';

    const values = [
        req.body.titulo,
        req.body.descricao,
        req.body.status,
        req.body.tempo_estimado,
    ]

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json('Tarefa adicionada com sucesso!')
    })
};


export const updateTarefa = (req, res) => {
    const q = 
        'UPDATE tarefas SET `titulo` = ?, `descricao` = ?, `status` = ?, `tempo_estimado` = ? WHERE `id` = ?';

    const values = [
        req.body.titulo,
        req.body.descricao,
        req.body.status,
        req.body.tempo_estimado,
    ]

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json('Tarefa atualizada com sucesso!')
    })
};


export const deleteTarefa = (req, res) => {
    const q = 
        'DELETE FROM tarefas WHERE `id` = ?';

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json('Tarefa excluida com sucesso!')
    })
};