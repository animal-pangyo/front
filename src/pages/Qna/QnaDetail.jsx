import { Divider } from 'semantic-ui-react';
import styled from '../Board/board.module.css';
import BoardDetailComponent from '../../components/common/board/BoardDetailComponent';

const QnaDetail = () => {
  return (
    <>
      <div className={`${styled.main} ${styled.detail}`}>
        <h2>Q & A</h2>
        <Divider />
        <BoardDetailComponent name="inquiry" />      
      </div>
    </>
  )
};

export default QnaDetail;