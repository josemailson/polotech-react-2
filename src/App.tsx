import React from 'react';
import './App.css';
import ButtonCounter from './components/ButtonCounter';
import { GlobalStyle } from './styles';

function App() {

  return (
    <div>
      <GlobalStyle/>
      <ButtonCounter title="Clique para adicionar elementos a uma lista" />
    </div>
  );
}

export default App;