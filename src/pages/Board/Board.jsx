import BoardList from "../../components/common/board/BoardList";
import styled from "./board.module.css";

/* 자유게시판 페이지를 렌더링 하는 컴포넌트입니다. */
const Board = () => {
  return (
    <>
      {/* className : className이름 설정 */}
      <div className={styled.main}>
        <h2>자유게시판</h2>
        {/* 게시판 리스트를 렌더링하는 컴포넌트입니다. */}
        {/* name : 자유게시판 타입 */}
        <BoardList name="free" />
      </div>
    </>
  );
};

export default Board;
