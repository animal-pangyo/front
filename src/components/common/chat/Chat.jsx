import styled from "./Chat.module.css";
import ChatListItem from "../chatList/ChatListItem";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchChatList } from "../../../services/api/chat.api";

const Chat = ({ handleCloseModal }) => {
  const {
    data: resData, // useQuery 훅을 통해 받아온 데이터
    isLoading, // 데이터 로딩 중 여부
    isError, // 데이터 요청 중 오류 발생 여부
  } = useQuery("chatList", fetchChatList); // chatList 쿼리를 통해 데이터를 가져옵니다.
  const chatList = resData?.data.data;  // 가져온 데이터에서 채팅 리스트를 추출합니다.
  
  return (
    <div className={styled.chatBox}>
      {/**채팅 리스트가 비어있거나 없는 경우에 대한 조건 확인 */}
      {!chatList || chatList.length === 0 ? ( 
        // 참여중인 채팅이 없을 경우
        <div className={styled.msgBox}> 
          <p>참여 중인 채팅이 없습니다. </p>
          <p>자유게시판을 통해 멤버와 채팅을 시작하세요.</p>
        </div>
      ) : (
        /* 참여중인 채팅이 있을 경우 채팅 리스트 아이템을 매핑하여 출력 */
        <div className={styled.chatList}>
          {chatList &&
            chatList.map((msgListItem, idx) => (
              <ChatListItem
                key={idx} // list item key
                msgListItem={msgListItem} // msg item
                handleCloseModal={handleCloseModal} // 모달 핸들러 전달
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
