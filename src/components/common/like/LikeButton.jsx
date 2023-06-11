import styled from "./like.module.css";
import { useEffect, useState } from 'react';
import * as storeApi from "../../../services/api/store.api";
import  Like  from "../../../assets/like.svg";
import UnLike  from "../../../assets/unlike.svg" 

function LikeButton({storeId, isLiked}) {
  console.log("btnm lklike", isLiked)
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setIsLike(isLiked);
  }, [isLiked]);
  
  const handleToggleLike = () => {
    setIsLike((prevIsLiked) => !prevIsLiked);

    updateLike()
  };

  const updateLike = async () => {
    const data = {
      storeId: storeId,
      isLiked: !isLike
    };
  
    try {
      const response = await storeApi.updateLike(data);
      console.log(response, "resultLike");
    } catch (error) {
      console.error('Failed to update like information:', error);
    }
  }

  return (

    <button className= {styled.like_button} onClick={handleToggleLike}>
      {/* {isLike ? '좋아요 취소' : '좋아요'} */}
      {isLike ? <img src={Like} /> :  <img src={UnLike} /> }
    </button>


  

  );
}

export default LikeButton;