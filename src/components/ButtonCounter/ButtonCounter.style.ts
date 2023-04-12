import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 4vh;
    margin: 4vh;
    height: 8vh;
`

const ButtonCounterStyle = styled.button`
  display: inline-block;
  height: 50px;
  width: 30vw;
  line-height: 50px;
  text-align: center;
  font-size: 12px;
  font-weight: 1000;
  color: #F0F6F6ff;
  text-transform: uppercase;
  background-color: #c09491;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin: 10px;
  box-shadow: 0px 3px 0px #a7848b;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: #a22365;
    box-shadow: 0px 5px 0px #743455;
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

export { Container, Buttons, ButtonCounterStyle };