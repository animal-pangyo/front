import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react";
import styled from "./search.module.css";

/* 검색어를 입력하고 검색을 할 수 있는 컴포넌트 입니다. */
/* searchKeyword : 사용자가 입력한 검색어를 부모로 전달하기 위한 함수입니다. */
const Search = ({ searchKeyword }) => {
  /* 검색어를 저장하기 위한 상태입니다. */
  const [searchTerm, setSearchTerm] = useState("");

  /* 검색 버튼 클릭 시 검색어를 부모로 전달하는 함수입니다. */
  const handleSearch = () => {
    searchKeyword(searchTerm);
  };

  return (
    /* className : className이름 설정 */
    <div className={`${styled.serachConatiner} searchCom`}>
      {/* 검색어 입력 용 태그 렌더링 */}
      {/* value : input에 검색어 상태 할당 */}
      {/* onChange : 사용자가 검색어를 입력하는 경우 호출되는 함수입니다. input의 값이 저장됩니다. */}
      <Input
        placeholder="업체를 검색하세요..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* className : className이름 설정 */}
      <div className={styled.button}>
        {/* 검색어 버튼입니다. */}
        {/* onClick : 검색어 클릭 시 호출되는 함수입니다. */}
        <button className={styled.button} onClick={handleSearch}>검색</button>
      </div>
    </div>
  );
};

export default Search;
