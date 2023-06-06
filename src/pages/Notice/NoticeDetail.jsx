import { Divider } from 'semantic-ui-react';
import styled from '../Board/board.module.css';
import BoardDetailComponent from '../../components/common/board/BoardDetailComponent';

const NoticeDetail = () => {
  return (
    <>
      <div className={`${styled.main} ${styled.detail}`}>
        <h2>공지사항</h2>
        <Divider />
        <BoardDetailComponent name="notice" />      
      </div>
    </>
  )
};

export default NoticeDetail;