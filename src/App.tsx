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
        <TitleSection>
          <Title>Shakesearch</Title>
        </TitleSection>
        <SearchBar onResult={(data : SearchResult[]) => {
          setResults(data);
        }}/>
        <ResultsList>
        {results.map((value : SearchResult) => <ResultCard result={value}/>)}
        </ResultsList>
      </MainContent>
    </AppWrapper>
  );
}

const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`

const MainContent = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`

const AppWrapper = styled.div`
  background-color: rgba(52,53,65,1);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default App;
