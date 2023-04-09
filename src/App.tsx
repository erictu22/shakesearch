import React, { useState } from 'react';
import styled from 'styled-components';
import { ResultList } from './components/ResultList';
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
        <ResultList resultList={results}/>
      </MainContent>
    </AppWrapper>
  );
}

const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const MainContent = styled.div`
@media only screen and (max-width: 768px) {
  width: 400px;
}
width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default App;
