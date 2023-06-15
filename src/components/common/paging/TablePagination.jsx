import { useEffect, useState } from "react";

/* 페이지네이션을 렌더링하는 컴포넌트 입니다. */
/* page : 현제 페이지 정보 */
/* start : 시작 페이지 번호 */
/* end : 현재 보여질 마지막 페이지 번호 */
/* total : 전체 게시판 수 */
/* last : 해당 게시판의 마지막 페이지 번호 */
/* move : 페이지 번호 클릭 시 실행될 함수입니다 */
/* colSpan : 컬럼을 합칠 개수를 나타냅니다. */
const TablePagination = ({ start, end, last, move, page, colSpan }) => {
  /* 화면에 보여줄 페이지 번호 리스트를 저장할 상태입니다. */
  const [paging, setPaging] = useState([]);

  useEffect(() => {
    const list = [];

    /* 부모로 부터 전달 받은 start숫자부터 end숫자까지 반복문을 호출하여 list에 숫자를 저장합니다. */
    for (let i = start; i <= end; i += 1) {
      list.push(i);
    }

    /* 리스트를 페이징 상태에 저장합니다. */
    /* 해당 하는 숫자를 렌더링 하는데 사용합니다. */
    setPaging(list);
  }, []);

  return (
    <tr>
      {/* 페이징을 테이블에서 구현하기 하는데 로우를 하나로 통합하기 위해서 colSpan을 사용합니다. */}
      <th colSpan={colSpan}>
        {/* className : className이름 설정 */}
        <div className="ui right floated pagination menu">
          {/* className : className이름 설정 */}
          {/* < 버튼입니다. 현재 페이지에서 이전 페이지로 이동합니다. */}
          {/* onClick : 이전 페이지 링크 클릭 시 호출될 함수 입니다. */}
          <a className="icon item" onClick={() => move(Math.max(page - 1, 1))}>
            {/* className : className이름 설정 */}
            <i className="left chevron icon"></i>
          </a>
          {/* 리스트에 담긴 페이지 숫자 정보가 존재한다면 페이지 링크 컴포넌트를 렌더링합니다. */}
          { 
            !!paging.length && paging.map((page) => (
              /* key : 각 링크 페이지를 구별하기 위한 키입니다. */
              /* className : className이름 설정 */
              /* onClick : 페이지 링크를 클릭 시 호출될 함수입니다. 클릭 시 해당 페이지로 이동합니다. */
              /* page : 페이지 숫자 */
              <a key={page} className="item" onClick={() => move(page)}>{page}</a>
            ))
          }
          {/* className : className이름 설정 */}
          {/* > 버튼입니다. 현재 페이지에서 다음 페이지로 이동합니다. */}
          {/* onClick : 다음 페이지 링크 클릭 시 호출될 함수 입니다. */}
          <a className="icon item" onClick={() => move(Math.min(page + 1, last))}>
            {/* className : className이름 설정 */}
            <i className="right chevron icon"></i>
          </a>
        </div>
      </th>
    </tr>
  )
};

export default TablePagination;