import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchResult } from '../fetchResults';
import { ResultCard } from './ResultCard';

export const ResultList: React.FC<{ readonly resultList: SearchResult[] }> = ({ resultList }) => {
    const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

    // Closes the result list whenever the component is dismounted
    useEffect(() => () => setExpandedIdx(null),[resultList])

    return <ResultsList>
        {resultList.map((value: SearchResult, index: number) => <ResultCard key={`card-${index}`} result={value} isExpanded={expandedIdx === index} onClick={() => {
            if (index === expandedIdx) {
                setExpandedIdx(null)
            } else {
                setExpandedIdx(index);
            }
        }} />)}
    </ResultsList>
}

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`