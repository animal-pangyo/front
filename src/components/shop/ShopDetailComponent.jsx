import styled from "./board.module.css";
import { Divider, Segment } from "semantic-ui-react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import useBoard from "../../hooks/useBoard";
import useAuth from "../../hooks/useAuth";
import { useRecoilState } from "recoil";
import { messageState } from "../../store/message";
import ReviewList from "../review/ReviewList";
import LikeButton from "../common/like/LikeButton";
import * as storeApi from "../../services/api/store.api";
import { useEffect, useState } from "react";


const ShopDetailComponent = ({ name }) => {
  const param = useParams();
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState(null);
  const userLike = !storeInfo?.likes?.length ? false : true;
  const [message, setMessage] = useRecoilState(messageState);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedName = queryParams.get('name');
  const storeName = decodeURIComponent(encodedName);

  console.log(encodedName, storeName, param.id);

  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        // 데이터 요청 시작 시 "데이터 받는 중" 표시
        setLoading(true);
        const storeId = param.id;
        // 스토어 정보 요청
        const response =  await  storeApi.getStoreInfo({ name: name, storeId: storeId, storeName: decodeURIComponent(storeName)  });

        // 스토어 정보 설정 및 "데이터 받는 중" 표시 종료
        setStoreInfo(response.data.stores);
        console.log(storeInfo, "dd", response.data)
        setLoading(false);
      } catch (error) {
        //에러 콘솔 
        console.error('Failed to fetch store info:', error);
        setLoading(false);
      }
    };

    fetchStoreInfo();
  }, []);

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
          <span>{storeName}</span>
          <div className={styled.phone}>
            <span className={styled.time}>전화번호 : {storeInfo && storeInfo.phone}</span>
            <span className={styled.time}>영업시간 : {storeInfo && storeInfo.time}</span>
            <LikeButton storeId={param.id} isLiked={storeInfo && storeInfo.like} />
          </div>    
        </h2>
        <Divider />
        <div className={styled.detail_content}>
          <div>카테고리 : {storeInfo && storeInfo.category_name}</div>
          <br/>
          <div>주소: {storeInfo && storeInfo.road_address_name}</div>
          <br/>
          <div>{storeInfo && storeInfo.place_url}</div>
        </div>
      </Segment>

      <ReviewList name={name} storeId={param.id} storeInfo={storeInfo && storeInfo} type="" />

      <div>
        <NavLink to={`/shop/${name}`}>
          <button className="ui button">목록</button>
        </NavLink>
      
      </div>
    </>
  );
};

export default ShopDetailComponent;
