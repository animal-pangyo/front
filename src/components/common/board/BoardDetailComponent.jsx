import styled from './board.module.css'
import { Divider, Segment } from 'semantic-ui-react';
import { NavLink, useParams } from 'react-router-dom';
import useBoard from '../../../hooks/useBoard';
import useAuth from '../../../hooks/useAuth';

const BoardDetailComponent = ({ name }) => {
  const param = useParams();
  const auth = useAuth();
  const board = useBoard({ type: 'detail', value: param.id, name });
    
  const deleteBoard = async (id) => {
    await board.deleteBoard(id);
    setMessage({
      visible: true,
      message: '삭제되었습니다.'
    });
  };

  return (
    <>
      <Segment className={styled.segment}>
        <h2 className={styled.detail_subject }>{board.board.id}</h2>
        <Divider />
        <div className={styled.detail_content}>{board.board.content}</div>
      </Segment>
      <div>
        <NavLink to="/board">
          <button className="ui button">
            목록
          </button>
        </NavLink>
        {
          auth?.user?.id && auth?.user?.id === board.writer && (
            <button className="ui primary button" onClick={deleteBoard}>
              삭제
            </button>
          )
        }
      </div>
    </>
  )
};

export default BoardDetailComponent