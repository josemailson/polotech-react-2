import React, { useState } from 'react';
import './App.css';
import ButtonCounter from './components/ButtonCounter';
import ListView from './components/ListView';
import ButtonListView from './components/ButtonListView';

function App() {
  const [listType, setListType] = useState('Completa');

  const handleButtonClick = (type: string) => {
    setListType(type);
  };

  const renderList = () => {
    let list: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if (listType === 'Impares') {
      list = list.filter((n) => n % 2 !== 0);
    } else if (listType === 'Pares') {
      list = list.filter((n) => n % 2 === 0);
    }

    return <ListView listNumbers={list} />;
  };

  return (
    <div>
      <ButtonCounter title="Clique em mim" />
      <ButtonListView title={'Completa'} color={'blue'} onClick={() => handleButtonClick('Completa')} />
      <ButtonListView title={'Impares'} color={'red'} onClick={() => handleButtonClick('Impares')} />
      <ButtonListView title={'Pares'} color={'green'} onClick={() => handleButtonClick('Pares')} />
      {renderList()}
    </div>
  );
}

export default App;