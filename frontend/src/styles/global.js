import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        font-family: 'poppins', 'sans-serif';
    };

    body {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        background: rgb(255,0,0);
        background: linear-gradient(127deg, rgba(255,0,0,1) 0%, rgba(0,28,167,1) 44%, rgba(87,0,0,1) 100%);
        
    };
`;

export default Global;
