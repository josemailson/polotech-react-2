import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: content-box;
    }

    body{
        background: #f4fad2;
        color: #172c3c;
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