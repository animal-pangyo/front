import styled from "./Chat.module.css";
import ChatListItem from "../chatList/ChatListItem";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchChatList } from "../../../services/api/chat.api";

const Chat = ({ handleCloseModal }) => {
  const {
    data: resData,
    isLoading,
    isError,
  } = useQuery("chatList", fetchChatList);
  const chatList = resData?.data.data;
  
  return (
    <div className={styled.chatBox}>
      {!chatList || chatList.length === 0 ? (
        <div className={styled.msgBox}>
          <p>참여 중인 채팅이 없습니다. </p>
          <p>자유게시판을 통해 멤버와 채팅을 시작하세요.</p>
        </div>
      ) : (
        /* 채팅 리스트 아이템을 매핑하여 출력 */
        <div className={styled.chatList}>
          {chatList &&
            chatList.map((msgListItem, idx) => (
              <ChatListItem
                key={idx}
                msgListItem={msgListItem}
                handleCloseModal={handleCloseModal}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
