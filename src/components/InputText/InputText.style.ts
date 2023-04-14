import styled from "styled-components";
import { InputProps } from "./InputText";

export const InputTextStyle = styled.input<InputProps>`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 15px;
  color: ${(props) => props.color || "#ffffff"};
  padding: 20px 24px;
  font-size: 1.3rem;
  font-weight: bold;
  outline: none;
`;