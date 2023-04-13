import styled from "styled-components";

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 30rem;
`;

export const TodoListContainer = styled.div`
    background: #457b9d;
    border-radius: 1rem;
    padding: 4rem 2.4rem;
    display: flex;
    flex-direction: column;
`;

export const TodoListItem = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  font-size: 1.3rem;
  list-style: none;
  font-weight: bold;
  height: 2.4rem;
`;

export const StrikethroughLabel = styled.span`
  text-decoration: line-through;
  margin-left: 0.5rem;
`;