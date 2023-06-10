import { Divider } from "semantic-ui-react";
import styled from "./board.module.css";
import BoardDetailComponent from "../../components/common/board/BoardDetailComponent";

const BoardDetail = () => {
  return (
    <>
      <div className={`${styled.main} ${styled.detail}`}>
        <h2>업체 후기</h2>
        <Divider />
        <BoardDetailComponent name="review" />
      </div>
    </>
  );
};

export default BoardDetail;
