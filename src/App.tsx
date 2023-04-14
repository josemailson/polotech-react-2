import React from 'react';
import { AppLayoutContainer, GlobalStyle } from './styles';
import ListView from './components/ListView/ListView';

function App() {

  return (
    <div>
      <GlobalStyle/>
      <AppLayoutContainer>
        <ListView/>
      </AppLayoutContainer>
    </div>
  );
}

export default App;