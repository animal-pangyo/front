import BoardList from "../../components/common/board/BoardList";
import styled from "../Board/board.module.css";

/* 문의게시판 리스트 페이지를 렌더링하는 컴포넌트 입니다. */
const Qna = () => {
  return (
    <>
      {/* className : className이름 설정 */}
      <div className={styled.main}>
        <h2>Q&A</h2>
        {/* 게시판 리스트 컴포넌트입니다. */}
        {/* name : 게시판의 종류인 공지사항을 나타냅니다. */}
        <BoardList name="inquiry" />
      </div>
    </>
  );
};

export default Qna;
