import React, { useEffect, useState } from "react";
import styled from "./ChatListItem.module.css";
import { Icon } from "semantic-ui-react";
import {
  useToggleBlockMutation,
  useDeleteChatMutation,
} from "../../../hooks/useChat";
import { useSetRecoilState } from "recoil";
import { chatingIdState } from "../../../store/chat";

function ChatListItem({ msgListItem, handleCloseModal }) {
  const setChatingIdState = useSetRecoilState(chatingIdState);

  const [isButtonVisible, setButtonVisible] = useState(false);
  const [isExitButton, setIsExitButton] = useState(false);
  const userId = msgListItem.userId;
  const chatId = msgListItem.chatId;

  const deleteChat = useDeleteChatMutation();

  const toggleButton = () => {
    if (isExitButton) {
      setButtonAndExitState(!isButtonVisible, !isExitButton);
    } else {
      openChat(userId);
    }
  };

  /* 채팅룸 나가기 버튼 클릭시 호출되는 함수입니다. */
  const exitChatButton = (e) => {
    e.stopPropagation();
    setButtonAndExitState(!isButtonVisible, !isExitButton);

    if (
      isButtonVisible &&
      !confirm(
        "채팅방을 나가시겠습니까? 대화방은 목록에서 삭제되고 대화 내용을 다시 볼 수 없습니다."
      )
    ) {
      return;
    }
    if (isExitButton) {
      /* 채팅룸 나가기 확인 후 채팅룸을 제거합니다/ */
      deleteChat.mutate(chatId);
      alert("처리되었습니다");
    }
  };

  const openChat = (userId) => {
    if (!isExitButton) {
      console.log("Open 1:1 Chat", userId);
      setChatingIdState(userId);
      handleCloseModal();
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
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
}

export default ChatListItem;
