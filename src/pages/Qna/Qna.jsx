import BoardList from "../../components/common/board/BoardList";
import styled from "../Board/board.module.css";

const Qna = () => {
  return (
    <>
      <div className={styled.main}>
        <h2>Q&A</h2>
        <BoardList name="inquiry" />
      </div>
    </>
  );
};

export default Qna;
