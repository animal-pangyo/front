import BoardList from "../../components/common/board/BoardList";
import styled from "./board.module.css";

const Board = () => {
  return (
    <>
      <div className={styled.main}>
        <h2>업체 후기</h2>
        <BoardList name="review" />
      </div>
    </>
  );
};

export default Board;
