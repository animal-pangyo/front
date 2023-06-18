import styled from "./like.module.css";
import { useEffect, useState } from 'react';
import * as storeApi from "../../../services/api/store.api";
import  Like  from "../../../assets/like.svg";
import UnLike  from "../../../assets/unlike.svg" 

/* 좋아요 버튼을 렌더링하는 컴포넌트입니다. */
/* storeId : 업체의 아이디 정보 */
/* isLiked : 업체에 사용자가 좋아요 했는지 유무 */
function LikeButton({storeId, isLiked}) {
  /* 좋아요 유무를 저장하는 상태를 생성합니다. */
  const [isLike, setIsLike] = useState(isLiked);

  useEffect(()=>{
    setIsLike(isLiked)
  },[isLiked])

  /* 좋아요 버튼 클릭 시 좋아요 유무를 변경하는 함수입니다. */
  const handleToggleLike = () => {
    setIsLike((prevIsLiked) => !prevIsLiked);

    /* 변경된 내용으로 서버를 호출하는 함수입니다. */
    updateLike()
  };

  /* 좋아요 버튼 클릭 후 서버로 해당 데이터를 전송하는 함수입니다. */
  const updateLike = async () => {
    /* storeId : 업체 아이디 */
    /* isLiked : 좋아요 유무 */
    const data = {
      storeId: storeId,
      isLiked: !isLike
    };
  
    try {
      /* 서버로 좋아요 유무를 전달하여 업데이트 합니다/ */
      await storeApi.updateLike(data);
    } catch (error) {
      /* 에러가 발생 시 에러 내용을 출력합니다. */
      console.error('Failed to update like information:', error);
    }
  }

  return (
    /* className : className이름 설정 */
    /* onClick : 좋아요 버튼 클릭 시 호출될 함수입니다. */
    <button className= {styled.like_button} onClick={handleToggleLike}>
      {/* 좋아요 유무에 따라 '좋아요 취소', '좋아요' 이미지를 렌더링합니다. */}
      {isLike ? <img src={UnLike} /> :  <img src={Like} /> }
    </button>


  

  );
}

export default LikeButton;