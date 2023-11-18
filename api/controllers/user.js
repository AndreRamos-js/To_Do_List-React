import { db } from '../db.js';



export const getUsers = (_, res) => {
    const q = "SELECT * FROM tarefas";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};


export const addUser = (req, res) => {
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


export const updateUser = (req, res) => {
    const q = 
        'UPDATE tarefas(`titulo`, `descricao`, `status`, `tempo_estimado`) VALUES(?)';

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