import { Divider } from 'semantic-ui-react';
import styled from '../Board/board.module.css';
import BoardWriteComponent from '../../components/common/board/BoardWriteComponent';

const NoticeWrite = () => {
  return (
    <>
      <div className={`${styled.main} ${styled.write}`}>
        <h2>공지사항</h2>
        <Divider />
        <BoardWriteComponent name="notice" />
      </div>
    </>
  )
};

export default NoticeWrite;