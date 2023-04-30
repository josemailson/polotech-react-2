import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 30rem;

  @media (max-width: 768px) {
        width: 19rem;
    }
`;

export const TodoListContainer = styled.div`
  background: #457b9d;
  border-radius: 1rem;
  padding: 4rem 2.4rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 1.2rem 0.4rem;
    }
`;

export const TodoListItem = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  font-size: 1.3rem;
  font-weight: bold;
  height: 2.4rem;
  @media (max-width: 768px) {
    padding: 0.4rem;
    font-size: 1.2rem;
    height: 1.8rem;
    }
`;

export const StrikethroughLabel = styled.span`
  text-decoration: line-through;
`;