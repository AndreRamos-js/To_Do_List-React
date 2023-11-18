import styled from 'styled-components';
import React, { useRef } from 'react';



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


const Form = ({ onEdit }) => {
    const ref = useRef();

    return (
        <FormContainer ref={ref}>
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
                <Input type="time" id="tempo_estimado" name="tempo_estimado" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;
