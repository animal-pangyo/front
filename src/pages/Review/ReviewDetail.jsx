import { Divider } from "semantic-ui-react";
import styled from "./board.module.css";
import BoardDetailComponent from "../../components/common/board/BoardDetailComponent";

/* 리뷰게시판 상세정보 페이지를 렌더링하는 컴포넌트 입니다. */
const BoardDetail = () => {
  return (
    <>
      {/* className : className이름 설정 */}
      <div className={`${styled.main} ${styled.detail}`}>
        <h2>업체 후기</h2>
        <Divider />
        {/* 게시판 상세정보 컴포넌트입니다. */}
        {/* name : 게시판의 종류인 리뷰게시판 나타냅니다. */}
        <BoardDetailComponent name="review" />
      </div>
    </>
  );
};

export default BoardDetail;
