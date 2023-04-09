import React from 'react';
import styled from 'styled-components';
import { SearchResult } from '../fetchResults';
import { HighlightText, P, Subtitle } from './Text';

export const ResultCard : React.FC<{readonly result: SearchResult, readonly isExpanded: boolean, readonly onClick: () => void}> = ({result, isExpanded, onClick}) => {
    
    return <ResultCardWrapper >
        <MainSection onClick={onClick}>
            <TextSection>
            <Subtitle style={{cursor: isExpanded ? 'text' : 'pointer'}}>{result.section}</Subtitle>
            </TextSection>
            <TextSection>
                <HighlightText text={`"${result.text}"`} highlightWords={result.key_words}/>
            </TextSection>
        </MainSection>
        <ExplanationSection className={isExpanded ? 'content show' : 'content'}>
            <P style={{marginTop: 12, marginBottom: 12, marginLeft: 8}}>{result.explanation}</P>
        </ExplanationSection>
    </ResultCardWrapper>
}

const TextSection = styled.div`
    display: flex;
    flex-direction: row;
`

const MainSection = styled.div`
    background-color: rgba(68,70,84,1);
    &:hover {
        background-color: rgba(79, 82, 94, 1);
    }
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
    padding: 16px 12px;
`

const ExplanationSection = styled.div`
    background-color: rgba(60,60,70, 1);
    overflow: hidden;
    padding: 0 12px;
`

const ResultCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
`