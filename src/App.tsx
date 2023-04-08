import React, { useState } from 'react';
import styled from 'styled-components';
import { ResultCard } from './components/ResultCard';
import SearchBar from './components/Searchbar';
import { Title } from './components/Text';
import { SearchResult } from './fetchResults';


function App() {

  const [results, setResults] = useState<SearchResult[]>([]);

  return (
    <AppWrapper>
      <MainContent>
        <Title>Shakesearch</Title>
        <SearchBar onResult={(data : SearchResult[]) => {
          setResults(data);
        }}/>
        {results.map((value : SearchResult) => <ResultCard result={value}/>)}
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
