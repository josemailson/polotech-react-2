import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: content-box;
    }

    body{
        background: #023047;
        color: #f1faee;
    }
`;

export const AppLayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    min-height: 100vh;
`;