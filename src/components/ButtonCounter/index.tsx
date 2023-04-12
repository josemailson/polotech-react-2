import React, { useState } from "react";
import ListView from "../ListView";
import ButtonListView from "../ButtonListView";
import { Container, Buttons, ButtonCounterStyle } from "./ButtonCounter.style";

export interface IButtonCounterProps {
  title: string;
  active?: boolean;
}

type ListType = 'Completa' | 'Impares' | 'Pares';

const ButtonCounter = ({ title, active = true }: IButtonCounterProps) => {
  const [count, setCount] = useState<number>(0);
  const [list, setList] = useState<number[]>([]);
  const [listType, setListType] = useState<ListType>('Completa');

  const handleClick = () => {
    setCount(count + 1);
    setList([...list, count+1]);
  };

  const handleButtonClick = (type: 'Completa' | 'Impares' | 'Pares') => {
    setListType(type);
  };

  const handleClearClick = () => {
    setList([]);
    setCount(0);
    setListType('Completa');
  }
  

  const renderList = (list: number[]) => {
    if (listType === 'Impares') {
      list = list.filter((n) => n % 2 !== 0);
    } else if (listType === 'Pares') {
      list = list.filter((n) => n % 2 === 0);
    }

    return <ListView listNumbers={list} />;
  };

  const isButtonDisabled = (type: 'Completa' | 'Impares' | 'Pares') => {
    return type === listType;
  }

  return (
    <Container>
      <Buttons>
        <ButtonCounterStyle className="button-counter" type="button" onClick={handleClick} disabled={!active}>
          {title}
        </ButtonCounterStyle>
        <ButtonListView
          title={"Completa"}
          color={"#3F3047"}
          onClick={() => handleButtonClick("Completa")}
          disabled={isButtonDisabled('Completa')}
        />
        <ButtonListView
          title={"Impares"}
          color={"#9BC995"}
          onClick={() => handleButtonClick("Impares")}
          disabled={isButtonDisabled('Impares')}
        />
        <ButtonListView
          title={"Pares"}
          color={"#5171a5"}
          onClick={() => handleButtonClick("Pares")}
          disabled={isButtonDisabled('Pares')}
        />
        <ButtonListView
        title={"Limpar Lista"}
        color={"#e3e92e"}
        onClick={() => handleClearClick()}
        disabled={false}
        />
      </Buttons>
      {renderList(list)}
    </Container>
  );
};

export default ButtonCounter;