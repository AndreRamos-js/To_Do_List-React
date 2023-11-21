import styled from 'styled-components';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: '5px',
    width: '400px',
    maxWidth: '80%',
    border: '1px solid #ccc',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', // Adicione esta linha para espaçamento entre os itens
  },
};


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
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editedTarefa, setEditedTarefa] = useState({
        titulo: '',
        descricao: '',
        status: '',
        tempo_estimado: '',
    });

    useEffect(() => {
        if (onEdit) {
          setEditedTarefa(onEdit);
          setModalIsOpen(true);
        }
      }, [onEdit]);

      const handleSubmit = async (e) => {
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

      const closeModal = () => {
        setModalIsOpen(false);
        setEditedTarefa({
          titulo: '',
          descricao: '',
          status: '',
          tempo_estimado: '',
        });
        setOnEdit(null);
      };
    
      const handleSave = async () => {
        try {
          await axios.put(`http://localhost:8800/${onEdit.id}`, editedTarefa);
          toast.success('Tarefa editada com sucesso!');
          getTarefas();
          closeModal();
        } catch (error) {
          toast.error('Erro ao editar a tarefa.');
        }
      };

    return (
        <>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Editar Tarefa">
            <h2>Editar Tarefa</h2>
            <label>Título:</label>
            <input
                type="text"
                id="titulo"
                name="titulo"
                value={editedTarefa.titulo}
                onChange={(e) =>
                setEditedTarefa({ ...editedTarefa, titulo: e.target.value })
                }
            />
            <label>Descrição:</label>
            <textarea
            id="descricao"
            name="descricao"
            value={editedTarefa.descricao}
            onChange={(e) =>
                setEditedTarefa({ ...editedTarefa, descricao: e.target.value })
            }
            style={{ minHeight: '100px', height: 'auto', resize: 'vertical' }}
            />
            <label>Status:</label>
            <select
                id="status"
                name="status"
                value={editedTarefa.status}
                onChange={(e) =>
                setEditedTarefa({ ...editedTarefa, status: e.target.value })
                }
            >
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluída">Concluída</option>
            </select>
            <label>Tempo Estimado:</label>
            <input
                type="text"
                id="tempo_estimado"
                name="tempo_estimado"
                placeholder="HH:MM:SS"
                value={editedTarefa.tempo_estimado}
                onChange={(e) =>
                setEditedTarefa({ ...editedTarefa, tempo_estimado: e.target.value })
                }
            />
            <button
                style={{
                    backgroundColor: '#2c73d2', // Cor azul
                    color: '#fff',
                    padding: '5px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: 'none',
                }}
                onClick={handleSave}>Salvar</button>
            <button
                style={{
                    backgroundColor: '#ff0000', // Cor vermelha
                    color: '#fff',
                    padding: '5px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: 'none',
                }}
                onClick={closeModal}>Fechar</button>
        </Modal>
        <FormContainer ref={ref} onSubmit={handleSubmit}>
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
        </>
    );
};

export default Form;
