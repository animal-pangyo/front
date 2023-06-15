import { Divider } from 'semantic-ui-react';
import styled from './board.module.css'
import BoardDetailComponent from '../../components/common/board/BoardDetailComponent';

/* 자유게시판 상세 페이지를 렌더링 하는 컴포넌트입니다. */
const BoardDetail = () => {
  return (
    <>
      {/* className : className이름 설정 */}
      <div className={`${styled.main} ${styled.detail}`}>
        <h2>자유게시판</h2>
        <Divider />
        {/* 게시판 상세페이지를 렌더링하는 컴포넌트입니다. */}
        {/* name : 자유게시판 타입 */}
        <BoardDetailComponent name="free" />      
      </div>
    </>
  )
};

export default BoardDetail;