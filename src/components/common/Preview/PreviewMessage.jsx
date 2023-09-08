import React, { useState, useEffect } from "react";
import styled from "./previewMessage.module.css";

const PreviewMessage = ({latestMessage}) => {
  // latestMessage를 상태로 관리
  const [message, setMessage] = useState(latestMessage);
  const [showMessage, setShowMessage] = useState(true);


  // latestMessage prop이 변경될 때 상태 업데이트
  useEffect(() => {
    setMessage(latestMessage);
        // latestMessage가 업데이트되면 fadeIn 클래스를 추가하여 나타나게 함
        setShowMessage(true);

        // 5초 후에 사라지기 위해 setTimeout 사용
        const timeout = setTimeout(() => {
          setShowMessage(false);
        }, 2000);
    
        // 컴포넌트가 unmount되거나 latestMessage가 변경되면 timeout을 클리어
        return () => clearTimeout(timeout);
  }, [latestMessage]);

  const messageClassName = showMessage ? `${styled.previewMsg}` : `${styled.previewMsgs}`;
  console.log(messageClassName, showMessage)
    return (
      <div className={styled.previewMsgBox}>
        <div className={messageClassName}>         
          {message}
        </div>
      </div>
    )
};

export default PreviewMessage;