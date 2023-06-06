import BoardList from '../../components/common/board/BoardList';
import styled from '../Board/board.module.css';

const Notice = () => {

  return (
    <>
      <div className={styled.main}>
        <h2>공지사항</h2>
        <BoardList name="notice" />
      </div>
    </>
  )
};

export default Notice;