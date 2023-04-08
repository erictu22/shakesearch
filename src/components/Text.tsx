import React from 'react';
import styled from 'styled-components';

export const Title = styled.h1`
    font-size: 40px;
    color: white;
    margin: 8px 0;
    `

export const Subtitle = styled.h1`
    font-size: 16px;
    color: white;
    font-weight: bold;
`

export const P = styled.p`
    font-size: 16px;
    color: white;
`

export const HighlightText : React.FC<{readonly text: string, highlightWords: string[]}> = ({ text , highlightWords }) => {
    const regex = new RegExp(`(${highlightWords.join('|')})`, 'gi');
  
    const parts = text.split(regex);
  
    return (
      <P>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index}>{part}</mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </P>
    );
  };