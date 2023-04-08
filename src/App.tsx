import React from 'react';
import styled from 'styled-components';
import { H1 } from './components/Text';


function App() {
  return (
    <AppWrapper>
      <H1> Shakesearch </H1>
      
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  background-color: rgba(52,53,65,1);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default App;
