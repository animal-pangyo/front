import BoardList from '../../components/common/board/BoardList';
import styled from './board.module.css';

const Board = () => {

  return (
    <>
      <div className={styled.main}>
        <h2>자유게시판</h2>
        <BoardList name="board" />
      </div>
    </>
  )
};

export default Board;