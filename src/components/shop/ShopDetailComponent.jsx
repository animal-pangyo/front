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
  /* URL에 포함된 파리미터의 정보를 추출하기 위한 훅입니다. */
  const param = useParams();

  // 업체의 상세 정보를 저장하는 상태입니다.
  const [storeInfo, setStoreInfo] = useState(null);

  // 업체에 해당하는 리뷰에 대한 정보를 저장하는 상태입니다.
  const [reviewInfo, setReviewInfo] = useState(null);

  // 완료 시 메시지를 출력하는 상태를 저장합니다.
  const [message, setMessage] = useRecoilState(messageState);

  // 파라미터로 전달받은 데이터를 가져오기 위해서 사용합니다.
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 쿼리 스트링으로 전달받은 name값을 저장합니다.
  const encodedName = queryParams.get('name');

  // 인고딩 된 데이터를 디코딩합니다.
  const storeName = decodeURIComponent(encodedName);

  // 삭제된 게시글의 ID를 전달받아 해당 게시글을 상태에서 제거하고 컴포넌트를 재렌더링
  const handleDelete = (id) => {
    setReviewInfo((prevReviewInfo) => prevReviewInfo.filter((item) => item.review_id !== id));
  };

  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        // 패스에 포함되어 있는 아이디 값을 가져옵니다. 이 값은 업체의 아이디 입니다.
        const storeId = param.id;

        // 업체 아이디와 이름을 서버로 전달하여 업체의 상세정보를 가져옵니다.
        const response =  await  storeApi.getStoreInfo({ name: name, storeId: storeId, storeName: decodeURIComponent(storeName)  });

        // 업체 정보를 받아서 저장합니다.
        setStoreInfo(response.data.stores);

        // 업체의 리뷰 게시판 정보를 저장합니다.
        setReviewInfo(response.data.reviews)
      } catch (error) {
        // 서버 에러 발생 시 콘솔을 출력하니다.
        console.error('Failed to fetch store info:', error);
      }
    };

    // 서버로 업체 정보를 가져오는 함수를 호출합니다.
    fetchStoreInfo();
  }, []);

  return (
    <>
      {/* className : className이름 설정 */}
      <Segment className={styled.segment}>
        {/* className : className이름 설정 */}
        <h2 className={styled.detail_subject}>
          {/* 업체 이름을 렌더링합니다. */}
          <span>{storeName}</span>
          {/* className : className이름 설정 */}
          <div className={styled.phone}>
            {/* className : className이름 설정 */}
            {/* 업체의 전화번호를 렌더링합니다. */}
            <span className={styled.time}>전화번호 : {storeInfo && storeInfo.phone}</span>
            {/* className : className이름 설정 */}
            {/* 업체의 영업시간을 렌더링합니다. */}
            <span className={styled.time}>영업시간 : {storeInfo && storeInfo.time}</span>
            {/* 업체의 좋아요 여부를 표현하는 컴포넌트를 렌더링합니다. */}
            {/* storeId : 업체 아이디 */}
            {/* isLiked : 좋아요 여부 */}
            <LikeButton storeId={param.id} isLiked={storeInfo && storeInfo.like} />
          </div>    
        </h2>
        <Divider />
        {/* className : className이름 설정 */}
        <div className={styled.detail_content}>
          {/* 업체의 카테고리 이름을 렌더링합니다. */}
          <div>카테고리 : {storeInfo && storeInfo.category_name}</div>
          <br/>
          {/* 업체의 주소를 렌더링합니다. */}
          <div>주소: {storeInfo && storeInfo.road_address_name}</div>
          <br/>
          {/* 업체의 사이트 URL 주소를 렌더링합니다. */}
          <div>{storeInfo && storeInfo.place_url}</div>
        </div>
      </Segment>

      {/* 해당 업체에 작성된 리뷰리스트를 렌더링합니다. */}
      {/* name : 업체 타입 */}
      {/* storeId : 업체 아이디 */}
      {/* reviewInfo : 리뷰 정보 */}
      <ReviewList onDelete={handleDelete} name={name} storeId={param.id} reviewInfo={reviewInfo && reviewInfo} type="" />

      <div>
        {/* 목록 버튼 클릭 시 지도 페이지로 이동합니다. */}
        <NavLink to={`/shop/${name}`}>
          {/* className : className이름 설정 */}
          <button className="ui button">목록</button>
        </NavLink>
      
      </div>
    </>
  );
};

export default ShopDetailComponent;
