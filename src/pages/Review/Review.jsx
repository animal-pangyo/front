import BoardList from "../../components/common/board/BoardList";
import styled from "./board.module.css";

/* 리뷰게시판 리스트 페이지를 렌더링하는 컴포넌트 입니다. */
const Board = () => {
  return (
    <>
      {/* className : className이름 설정 */}
      <div className={styled.main}>
        <h2>업체 후기</h2>
        {/* 게시판 리스트 컴포넌트입니다. */}
        {/* name : 게시판의 종류인 공지사항을 나타냅니다. */}
        <BoardList name="review" />
      </div>
    </>
  );
};

export default Board;
