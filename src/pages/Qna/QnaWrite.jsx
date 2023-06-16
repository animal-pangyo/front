import { Divider } from "semantic-ui-react";
import styled from "../Board/board.module.css";
import BoardWriteComponent from "../../components/common/board/BoardWriteComponent";

/* 문의게시판 글쓰기 페이지를 렌더링하는 컴포넌트 입니다. */
const QnaWrite = () => {
  return (
    <>
      {/* className : className이름 설정 */}
      <div className={`${styled.main} ${styled.write}`}>
        <h2>Q&A</h2>
        <Divider />
        {/* 게시판 글쓰기 컴포넌트입니다. */}
        {/* name : 게시판의 종류인 문의게시판을 나타냅니다. */}
        <BoardWriteComponent name="inquiry" />
      </div>
    </>
  );
};

export default QnaWrite;
