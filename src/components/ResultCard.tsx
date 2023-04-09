import React from 'react';
import styled from 'styled-components';
import { SearchResult } from '../fetchResults';
import { HighlightText, P, Subtitle } from './Text';

export const ResultCard : React.FC<{readonly result: SearchResult, readonly isExpanded: boolean, readonly onClick: () => void}> = ({result, isExpanded, onClick}) => {
    return <ResultCardWrapper>
        <MainSection onClick={onClick}>
            <Subtitle>{result.section}</Subtitle>
            <HighlightText text={result.text} highlightWords={result.key_words}/>
        </MainSection>
        {isExpanded ? <ExplanationSection>
            <P>{result.explanation}</P>
        </ExplanationSection> : null}
    </ResultCardWrapper>
}

const MainSection = styled.div`
    background-color: rgba(68,70,84,1);
    &:hover {
        background-color: rgba(79, 82, 94, 1);
    }
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
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