import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";



const Table = styled.table`
    width: 100vw;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 1450px;
    margin: 20px 0;
    word-break: break-all; // Caso o dispositivo seja muito pequeno ele quebra as palavras
`;


export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
        ${(props) => props.onlyweb && "display: none"}
    };
`;


export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width: "auto")};

    @media (max-width: 500px) {
        ${(props) => props.onlyweb && "display: none"}
    };
`;


const Grid = ({ users }) => {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Título</Th>
                    <Th>Descrição</Th>
                    <Th>Status</Th>
                    <Th>Tempo Estimado</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) => (
                    <Tr key={i}>
                        <Td width='20%'>{item.titulo}</Td>
                        <Td width='20%'>{item.descricao}</Td>
                        <Td width='20%'>{item.status}</Td>
                        <Td width='20%'>{item.tempo_estimado}</Td>
                        <Td alignCenter width="5%">
                            <FaEdit />
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;