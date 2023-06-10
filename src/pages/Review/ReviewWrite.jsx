import { Divider } from "semantic-ui-react";
import styled from "./board.module.css";
import BoardWriteComponent from "../../components/common/board/BoardWriteComponent";

const BoardWrite = () => {
  return (
    <>
      <div className={`${styled.main} ${styled.write}`}>
        <h2>업체 후기</h2>
        <Divider />
        <BoardWriteComponent name="review" />
      </div>
    </>
  );
};

export default BoardWrite;
