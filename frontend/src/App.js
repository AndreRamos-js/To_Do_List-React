import GlobalStyle from './styles/global.js';
import styled from 'styled-components';
import Form from './components/Form.js';
import Grid from './components/Grid.js';
import { useEffect, useState } from 'react';
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

const Div = styled.div`
    width: 100%;
	max-width: 626px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    word-break: break-all;
`;

const Title = styled.h2`
	color: #fff;
`;

const SubTitle = styled.h3`
	color: #fff;
`;

function App() {
	const [tarefas, setTarefas] = useState([]);
	const [onEdit, setOnEdit] = useState(null);
	const [totalHorasEstimadas, setTotalHorasEstimadas] = useState(0);

	const getTarefas = async () => {
		try {
			const res = await axios.get('http://localhost:8800/');
			setTarefas(res.data);

			// Calcular o total de horas estimadas
			const totalHoras = res.data.reduce((total, tarefa) => {
				const tempoEstimadoEmSegundos = convertParaSegundos(tarefa.tempo_estimado);
				return total + tempoEstimadoEmSegundos;
			}, 0);

			setTotalHorasEstimadas(totalHoras);
		} catch (error) {
			toast.error(error);
		}
	}

	useEffect(() => {
		getTarefas();
	}, [setTarefas]);

	// Função para converter o formato HH:mm:ss para segundos
	const convertParaSegundos = (tempo) => {
		const [horas, minutos, segundos] = tempo.split(":").map(Number);
		return horas * 3600 + minutos * 60 + segundos;
	};

	// Função para formatar segundos para "hh horas e mm minutos"
	const formatarTempo = (segundos) => {
		const horas = Math.floor(segundos / 3600);
		const minutos = Math.floor((segundos % 3600) / 60);
		return `${horas} horas e ${minutos} minutos`;
	};

	return (
		<>
			<Container>
				<Title>GERENCIADOR DE TAREFAS</Title>
				<br/>
				<SubTitle>Adicione suas tarefas:</SubTitle>
				<Form onEdit={onEdit} setOnEdit={setOnEdit} getTarefas={getTarefas} />
				<br/>
				<Grid tarefas={tarefas} setTarefas={setTarefas} setOnEdit={setOnEdit} />
				<Div>
					Total de horas estimadas para concluir todas as tarefas: {formatarTempo(totalHorasEstimadas)}
				</Div>
			</Container>
			<ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
			<GlobalStyle />
		</>
	);
}

export default App;
