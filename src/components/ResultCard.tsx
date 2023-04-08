import React from 'react';
import styled from 'styled-components';
import { SearchResult } from '../fetchResults';
import { HighlightedText, P, Subtitle } from './Text';

export const ResultCard : React.FC<{result: SearchResult}> = ({result}) => {
    return <ResultCardWrapper>
        <Subtitle>{result.section}</Subtitle>
        <HighlightedText text={result.text} highlightedWords={result.key_words.split(' ')}/>
    </ResultCardWrapper>
}

const ResultCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(68,70,84,1);
`