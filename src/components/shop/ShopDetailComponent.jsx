import styled from "./board.module.css";
import { Divider, Segment } from "semantic-ui-react";
import { NavLink, useParams } from "react-router-dom";
import useBoard from "../../hooks/useBoard";
import useAuth from "../../hooks/useAuth";
import { useRecoilState } from "recoil";
import { messageState } from "../../store/message";
import ReviewList from "../review/ReviewList";
import LikeButton from "../common/like/LikeButton";

const ShopDetailComponent = ({ name }) => {
  const param = useParams();
  const auth = useAuth();
  const board = useBoard({ type: "detail", value: param.id, name });
  const storeInfo = board.board.storeInfo || board ;
  const userLike = !storeInfo?.likes?.length ? false : true;

  const [message, setMessage] = useRecoilState(messageState);

  const deleteBoard = async (id) => {
    await board.deleteBoard(id);
    setMessage({
      visible: true,
      message: "삭제되었습니다.",
    });
  };

  return (
    <>
      <Segment className={styled.segment}>
        <h2 className={styled.detail_subject}>
          <span>{storeInfo.name}</span>
          <div className={styled.phone}>
            <span className={styled.time}>전화번호 : {storeInfo.contact}</span>
            <span className={styled.time}>영업시간 : {storeInfo.business_hours}</span>
            <LikeButton storeId={param.id} isLiked={userLike} />
          </div>    
        </h2>
        <Divider />
        <div className={styled.detail_content}>{storeInfo.details}</div>
      </Segment>

      <ReviewList name={name} storeId={param.id} type="" />

      <div>
        <NavLink to={`/shop/${name}`}>
          <button className="ui button">목록</button>
        </NavLink>
        {auth?.user?.id && auth?.user?.id === board.writer && (
          <button className="ui primary button" onClick={deleteBoard}>
            삭제
          </button>
        )}
      </div>
    </>
  );
};

export default ShopDetailComponent;
