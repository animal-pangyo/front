import { Divider } from 'semantic-ui-react';
import styled from './board.module.css'
import BoardWriteComponent from '../../components/common/board/BoardWriteComponent';

/* 자유게시판 글쓰기 페이지를 렌더링 하는 컴포넌트입니다. */
const BoardWrite = () => {
  return (
    <>
      {/* className : className이름 설정 */}
      <div className={`${styled.main} ${styled.write}`}>
        <h2>자유게시판</h2>
        <Divider />
        {/* 게시판 글쓰기 페이지를 렌더링하는 컴포넌트입니다. */}
        {/* name : 자유게시판 타입 */}
        <BoardWriteComponent name="free" />
      </div>
    </>
  )
};

export default BoardWrite;