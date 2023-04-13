import styled from "styled-components";

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 30rem;
`;

export const TodoListContainer = styled.div`
    background: grey;
    border-radius: 1rem;
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
`;

export const TodoListItem = styled.label`
    display: flex;
    padding: 0.8rem;
    justify-content: space-evenly;
    font-size: 1.3rem;
    list-style: none;
    font-weight: bold;
`;