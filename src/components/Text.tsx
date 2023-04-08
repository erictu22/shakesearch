import React from 'react';
import styled from 'styled-components';

export const Title = styled.h1`
    font-size: 40px;
    color: white;
`

export const Subtitle = styled.h1`
    font-size: 16px;
    color: white;
    font-weight: bold;
`

export const P = styled.p`
    font-size: 16px;
    color: white;

    margin: 
`

function highlightWordsInText(text: string, words: string[]) {
    // Split the text into words and map each word to a JSX element
    return text.split(/\b/).map((word, index) => {
        // Check if the word is in the list of highlight words
        const shouldHighlight = words.includes(word.toLowerCase());
        // Return the word as a plain string if it doesn't need to be highlighted
        if (!shouldHighlight) {
            return word;
        }
        // Otherwise, wrap the word in a span with a highlight style
        return <span key={index} style={{ backgroundColor: 'yellow' }}>{word}</span>;
    });
}

export const HighlightedText: React.FC<{ readonly text: string, readonly highlightedWords: string[] }> = ({ text, highlightedWords: highlightWords }) => {
    const highlightedText = highlightWordsInText(text, highlightWords);
    return <P>{highlightedText}</P>;
}