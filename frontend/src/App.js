import GlobalStyle from './styles/global.js';
import styled from 'styled-components';
import Form from './components/Form.js';
import Grid from './components/Grid.js';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



const Container = styled.div`
	width: 100%;
	max-width: 800px;
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
`;

const Title = styled.h2``;

function App() {
	const [tarefas, setTarefas] = useState([]);
	const [onEdit, setOnEdit] = useState(null);

	const getTarefas = async () => {
		try {
			const res = await axios.get('http://localhost:8800/');
				setTarefas(res.data);
		} catch (error) {
			toast.error(error);
		}
	}

	useEffect(() => {
		getTarefas();
	}, [setTarefas]);

  return (
    <>
      <Container>
				<Title>GERENCIADOR DE TAREFAS</Title>
				<Form onEdit={onEdit} setOnEdit={setOnEdit} getTarefas={getTarefas} />
				<Grid tarefas={tarefas} setTarefas={setTarefas} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
