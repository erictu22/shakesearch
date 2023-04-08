import React, { useState } from "react";
import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { prompt, SearchResult } from "../fetchResults";

const SearchBar : React.FC<{readonly onResult : (result: SearchResult[]) => void}> = ({onResult}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event : any) => {
    setSearchTerm(event.target.value);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <SearchButton onClick={async () => {
        const data : SearchResult[] = await prompt(searchTerm, 3);
        onResult(data)
      }}><FontAwesomeIcon icon={faSearch}/></SearchButton>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

const SearchInput = styled.input`
  color: white;
  background-color: rgba(64,65,79, 1);
  padding: 8px 40px 8px 8px;
  font-size: 16px;
  border-radius: 8px;
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