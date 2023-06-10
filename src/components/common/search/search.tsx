import React, { useState } from "react";
import styled from "./search.module.css";
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // 업체 검색 로직을 구현합니다.
    // ...

    // 예시: 임시 검색 결과 데이터
    const tempSearchResults = [
      { id: 1, name: "Company A" },
      { id: 2, name: "Company B" },
      { id: 3, name: "Company C" },
    ];

    setSearchResults(tempSearchResults);
  };

  return (
    <div className="company-search-container">
      <div className="ui input">
        <input
          placeholder="제목을 검색하세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="ui button">
        <button onClick={handleSearch}>검색</button>
      </div>
    </div>
  );
};

export default Search;
