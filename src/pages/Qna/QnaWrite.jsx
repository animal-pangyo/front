import { Divider } from 'semantic-ui-react';
import styled from '../Board/board.module.css';
import BoardWriteComponent from '../../components/common/board/BoardWriteComponent';

const QnaWrite = () => {
  return (
    <>
      <div className={`${styled.main} ${styled.write}`}>
        <h2>Q & A</h2>
        <Divider />
        <BoardWriteComponent name="inquiry" />
      </div>
    </>
  )
};

export default QnaWrite;