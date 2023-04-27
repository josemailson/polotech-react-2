import styled from "styled-components";
import { IHeader } from "./Header";

export const HeaderStyle = styled.h1<IHeader>`
   color: ${(props) => props.color || "#ffffff"};
`