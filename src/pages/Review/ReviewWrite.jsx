import { Divider } from "semantic-ui-react";
import styled from "./board.module.css";
import BoardWriteComponent from "../../components/common/board/BoardWriteComponent";

/* 리뷰게시판 글쓰기 페이지를 렌더링하는 컴포넌트 입니다. */
const BoardWrite = () => {
  return (
    <>
      {/* className : className이름 설정 */}
      <div className={`${styled.main} ${styled.write}`}>
        <h2>업체 후기</h2>
        <Divider />
        {/* 게시판 글쓰기 컴포넌트입니다. */}
        {/* name : 게시판의 종류인 리뷰게시판을 나타냅니다. */}
        <BoardWriteComponent name="review" />
      </div>
    </>
  );
};

export default BoardWrite;
