import styled from './board.module.css'
import { Divider, Segment } from 'semantic-ui-react';
import { NavLink, useParams } from 'react-router-dom';
import useBoard from '../../hooks/useBoard';
import useAuth from '../../hooks/useAuth';

const ShopDetailComponent = ({ name }) => {
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
        <h2 className={styled.detail_subject }>
          <span>{board.board.name}</span>
          <div className={styled.phone}>
            <span className={styled.time}>전화번호 : {board.board.phone}</span>
            <span className={styled.time}>영업시간 : {board.board.time}</span>
          </div>
        </h2>
        <Divider />
        <div className={styled.detail_content}>{board.board.detail}</div>
      </Segment>
      <div>
        <NavLink to={`/shop/${name}`}>
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

export default ShopDetailComponent