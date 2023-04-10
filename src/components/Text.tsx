import React from 'react';
import styled from 'styled-components';

export const Title = styled.h1`
    font-size: 40px;
    color: white;
    margin: 0;
    padding: 0;
    `

export const Subtitle = styled.h1`
    font-size: 16px;
    color: white;
    font-weight: bold;
    margin: 4px 0;
`

export const P = styled.p`
    font-size: 16px;
    color: white;
    cursor: text;
    margin: 4px 0;
    line-height: 24px;
    `

const HighlightSpan = styled.span`
    font-weight: bold;
`

export const HighlightText : React.FC<{readonly text: string, highlightWords: string[]}> = ({ text , highlightWords }) => {
    const regex = new RegExp(`(${highlightWords.join('|')})`, 'gi');
  
    const parts = text.split(regex);
  
    return (
      <P>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <HighlightSpan key={index}>{part}</HighlightSpan>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </P>
    );
  };