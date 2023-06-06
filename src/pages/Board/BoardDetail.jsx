import { Divider } from 'semantic-ui-react';
import styled from './board.module.css'
import BoardDetailComponent from '../../components/common/board/BoardDetailComponent';

const BoardDetail = () => {
  return (
    <>
      <div className={`${styled.main} ${styled.detail}`}>
        <h2>자유게시판</h2>
        <Divider />
        <BoardDetailComponent name="board" />      
      </div>
    </>
  )
};

export default BoardDetail;