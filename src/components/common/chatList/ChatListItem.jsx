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

  const [isButtonVisible, setButtonVisible] = useState(false); // 버튼의 가시성 상태를 관리하는 상태
  const [isExitButton, setIsExitButton] = useState(false); // 채팅 나가기 버튼 상태를 관리하는 상태
  const userId = msgListItem.userId; // 메시지를 보낸 사용자 ID
  const chatId = msgListItem.chatId; // 채팅 ID

  const deleteChat = useDeleteChatMutation(); // 채팅 삭제 함수

  const toggleButton = () => {
    if (isExitButton) {
        // 채팅 나가기 버튼이 활성화된 경우
      setButtonAndExitState(!isButtonVisible, !isExitButton); // 버튼 상태 업데이트
    } else {
      // 채팅 열기
      openChat(userId);
    }
  };

  /* 채팅룸 나가기 버튼 클릭시 호출되는 함수입니다. */
  const exitChatButton = (e) => {
    // 클릭 이벤트의 확산을 막음
    e.stopPropagation(); 
    // 버튼 상태 업데이트
    setButtonAndExitState(!isButtonVisible, !isExitButton);

    if (
      isButtonVisible &&
      !confirm(
        "채팅방을 나가시겠습니까? 대화방은 대화중인 모든 유저의 목록에서 삭제되고 대화 내용을 다시 볼 수 없습니다."
      )
    ) {
      return;
    }
    /* isExitButton true인 경우 */
    if (isExitButton) {
      /* 채팅룸 나가기 확인 후 채팅룸을 제거합니다 */
      // 채팅 삭제 요청
      deleteChat.mutate(chatId);
       // 모달 닫기
      handleCloseModal();
      alert("처리되었습니다");
    }
  };

  const openChat = (userId) => {
    if (!isExitButton) {
      // setChatingIdState
      setChatingIdState(userId);
      // 모달 닫기
      handleCloseModal();
    }
  };

  const setButtonAndExitState = (buttonVisible, exitButton) => {
    // 버튼 가시성 업데이트
    setButtonVisible(buttonVisible);
    // 채팅 나가기 버튼 상태 업데이트
    setIsExitButton(exitButton);
  };

  return (
    <div className={styled.listBox} onClick={toggleButton}>
          {/* 채팅 리스트에 toggleButton을 달아줍니다.  */}
      <div className={styled.listItemBox}>
            {/* 채팅 리스트 유저 아이콘을 넣습니다.  */}
        <i className="circular user icon"></i>
        <div className={styled.contentBox}>
           {/* 채팅 리스트를 표현하기 위한 유저 아이디 메시지 시간을 구성합니다.  */}
          <div className={styled.userId}>{userId}</div>
          <div className={styled.msgListItem}>{msgListItem.content}</div>
        </div>
        <div className={styled.chatDate}>{msgListItem.date}</div>
      </div>
         {/* 나각기 버튼이 활성화 되면 채팅 리스트 아이템에 나가기 버튼을 보여줍니다. */}
      {isButtonVisible ? (
        <div className={styled.buttonContainer}>
          <button onClick={exitChatButton}>나가기</button>
        </div>
      ) : (
        //그렇지 않은 경우 더보기 아이콘을 보여줍니다.
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
