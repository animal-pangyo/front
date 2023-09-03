import React, { useEffect, useState } from 'react';
import styled from './ChatListItem.module.css';
import { Icon } from 'semantic-ui-react';


function ChatListItem({ msgListItem }) {


  const [isButtonVisible, setButtonVisible] = useState(false);
  const [isExitButton, setIsExitButton] = useState(false);
  const userId = msgListItem.userId;

  const toggleButton = () => {
    if (isExitButton) {
      setButtonAndExitState(!isButtonVisible, !isExitButton);
    } else {
      openChat(userId);
    }
  };

  const exitChatButton = (e) => {
    e.stopPropagation();
    setButtonAndExitState(!isButtonVisible, !isExitButton);
    console.log('Exit', userId);
    // Make your delete API request here
  };

  const openChat = (userId) => {
    if (!isExitButton) {
      console.log('Open 1:1 Chat', userId);
    }
  };

  const setButtonAndExitState = (buttonVisible, exitButton) => {
    setButtonVisible(buttonVisible);
    setIsExitButton(exitButton);
  };

  return (
    <div className={styled.listBox} onClick={toggleButton}>
      <div className={styled.listItemBox}>
        <i className="circular user icon"></i>
        <div className={styled.contentBox}>
          <div className={styled.userId}>{userId}</div>
          <div className={styled.msgListItem}>{msgListItem.content}</div>
        </div>
        <div className={styled.chatDate}>{msgListItem.date}</div>
      </div>

      {isButtonVisible ? (
        <div className={styled.buttonContainer}>
          <button onClick={exitChatButton}>나가기</button>
        </div>
      ) : (
        <Icon
          name="ellipsis vertical"
          onClick={exitChatButton}
          style={{ cursor: 'pointer' }}
        />
      )}
    </div>
  );
}

export default ChatListItem;
