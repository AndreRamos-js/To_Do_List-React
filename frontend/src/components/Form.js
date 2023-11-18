import styled from 'styled-components';
import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;


const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;


const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;


const Select = styled.select`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;


const Label = styled.label``;


const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: #fff;
    height: 42px;
`;


const Form = ({ getTarefas, onEdit, setOnEdit }) => {
    const ref = useRef();


    useEffect(() =>{
        if (onEdit){
            const tarefa = ref.current;

            tarefa.titulo.value = onEdit.titulo;
            tarefa.descricao.value = onEdit.descricao;
            tarefa.status.value = onEdit.status;
            tarefa.tempo_estimado.value = onEdit.tempo_estimado;
        }
    }, [onEdit]);

    const hadleSubmit = async (e) => {
        e.preventDefault();

        const tarefa = ref.current;

        if(
            !tarefa.titulo.value ||
            !tarefa.descricao.value ||
            !tarefa.status.value ||
            !tarefa.tempo_estimado.value
        ){
            return toast.warn('Preencha todos os campos!')
        }

        // Validação do formato HH:mm:ss
        const regex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
            if (!regex.test(tarefa.tempo_estimado.value)) {
                return toast.warn('Formato de tempo inválido. Use HH:mm:ss');
        }

        if (onEdit){
            await axios
                .put('http://localhost:8800/' + onEdit.id, {
                    titulo: tarefa.titulo.value,
                    descricao: tarefa.descricao.value,
                    status: tarefa.status.value,
                    tempo_estimado: tarefa.tempo_estimado.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post('http://localhost:8800/', {
                    titulo: tarefa.titulo.value,
                    descricao: tarefa.descricao.value,
                    status: tarefa.status.value,
                    tempo_estimado: tarefa.tempo_estimado.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        tarefa.titulo.value = '';
        tarefa.descricao.value = '';
        tarefa.status.value = '';
        tarefa.tempo_estimado.value = '';

        setOnEdit(null);
        getTarefas();
    };

    return (
        <FormContainer ref={ref} onSubmit={hadleSubmit}>
            <InputArea>
                <Label>Título:</Label>
                <Input type="text" id="titulo" name="titulo" />
            </InputArea>

            <InputArea>
                <Label>Descrição:</Label>
                <Input type="text" id="descricao" name="descricao" />
            </InputArea>

            <InputArea>
                <Label>Status:</Label>
                <Select id="status" name="status">
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluída">Concluída</option>
                </Select>
            </InputArea>

            <InputArea>
            <Label>Tempo Estimado:</Label>
            <Input
            type="text"
            id="tempo_estimado"
            name="tempo_estimado"
            placeholder="HH:MM:SS"
            />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;
