import React, { useState } from "react";
import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { prompt, SearchResult } from "../fetchResults";
import { Ring } from "@uiball/loaders";
import { ProgressBar } from "./ProgressBar";
import { MAX_NUM_RESULTS } from "../constants";

const SearchBar: React.FC<{ readonly onResult: (result: SearchResult[]) => void }> = ({ onResult }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  let resultString = ""
  let numClosingTokens = 0
  const handleSubmit = async () => {

    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setProgress(1)
    prompt(searchTerm, MAX_NUM_RESULTS, (content: string, isDone: boolean) => {
      if (isDone) {
        setIsLoading(false);
        try {
          
          const data = JSON.parse(resultString);
          const results: SearchResult[] = data.map((datum: any) => {
            const result: SearchResult = {
              section: datum['section'],
              text: datum['quote'],
              key_words: datum['key_words'],
              explanation: datum['explanation']
            }
            return result;
          })
          onResult(results)
          setProgress(0)
        } catch {
          alert('The model failed to respond with a properly formatted JSON response')
          window.location.reload();
          console.log(resultString)
        }


      } else {
        resultString = resultString + content;
        if (content.includes('{')) {
          numClosingTokens = numClosingTokens + 1
        }
        setProgress(Math.floor((numClosingTokens / (MAX_NUM_RESULTS)) * 100))
      }
    });

  }

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyUp={(event: React.KeyboardEvent) => {
          if (event.key === "Enter") {
            handleSubmit()
          }
        }}
      />
      <ProgressBar progress={progress} />
      <SearchButton onClick={handleSubmit}>{isLoading ? <Ring size={20} color='grey' /> : <FontAwesomeIcon icon={faSearch} />}</SearchButton>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin: 4px 0 12px 0;
`;

const SearchInput = styled.input`
  color: white;
  background-color: rgba(64,65,79, 1);
  padding: 8px 40px 8px 12px;
  font-size: 16px;
  border: none;
  outline: none;
  width: 100%;
`;

const SearchButton = styled.div`
  border: none;
  border-radius: 0 8px 8px 0;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  position: absolute;
  right: 4px;
  color: grey;
`;

export default SearchBar;