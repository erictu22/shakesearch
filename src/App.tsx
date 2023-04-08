import React from 'react';
import styled from 'styled-components';
import SearchBar from './components/Searchbar';
import { H1 } from './components/Text';


function App() {
  return (
    <AppWrapper>
      <MainContent>
        <H1>Shakesearch</H1>
        <SearchBar/>
      </MainContent>
    </AppWrapper>
  );
}

const MainContent = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AppWrapper = styled.div`
  background-color: rgba(52,53,65,1);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default App;
