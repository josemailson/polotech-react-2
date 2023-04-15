import styled from "styled-components";
import { IButtonListViewProps } from "./ButtonListView";

const ButtonList = styled.button<IButtonListViewProps>`
    display: inline-block;
    height: ${(props) => props.height || "10vw"};
    width: ${(props) => props.width || "10vw"};
    background-color: ${(props) => props.color || "#ffffff"};
    text-align: center;
    font-size: 0.8rem;
    font-weight: 1000;
    color: #F0F6F6ff;
    text-transform: uppercase;
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    margin: 10px;
    box-shadow: 0px 3px 0px #a7848b;
    transition: all 0.1s ease-in-out;

    &:hover{
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

export default ButtonList;