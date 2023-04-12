import styled, { css }from "styled-components";

const ButtonList = styled.button<{ color: string }>`
    display: inline-block;
    height: 50px;
    width: 10vw;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
    font-weight: 1000;
    color: #F0F6F6ff;
    text-transform: uppercase;
    border: none;
    border-radius: 25px;
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

    ${({ color }) =>
    css`
      background-color: ${color};
    `}
`;

export default ButtonList;