import React from 'react';
import styled from 'styled-components';
import { SearchResult } from '../fetchResults';
import { HighlightText, P, Subtitle } from './Text';

export const ResultCard : React.FC<{result: SearchResult}> = ({result}) => {
    return <ResultCardWrapper>
        <MainSection>
            <Subtitle>{result.section}</Subtitle>
            <HighlightText text={result.text} highlightWords={result.key_words}/>
        </MainSection>
        <ExplanationSection>
            <P>{result.explanation}</P>
        </ExplanationSection>
    </ResultCardWrapper>
}

const MainSection = styled.div`
    background-color: rgba(68,70,84,1);
    padding: 0 8px;
`

const ExplanationSection = styled.div`
    background-color: rgba(64,65,79, 1);
    padding: 0 8px;
`

const ResultCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
`