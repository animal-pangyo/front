import React, { useState } from "react";
import { Input, Button, List } from "semantic-ui-react";
import styled from "./search.module.css";

const Search = ({ searchKeyword }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    searchKeyword(searchTerm);
  };

  return (
    <div className={styled.serachConatiner}>
      <Input
        placeholder="업체를 검색하세요..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styled.button}>
        <Button onClick={handleSearch}>검색</Button>
      </div>
    </div>
  );
};

export default Search;
