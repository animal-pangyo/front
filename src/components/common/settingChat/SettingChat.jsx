import styled from "./SettingChat.module.css";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchBlockedChatList } from "../../../services/api/chat.api";
import { useToggleBlockMutation } from "../../../hooks/useChat";

const SettingChat = () => {
  const {
    data: resData,
    isLoading,
    isError,
  } = useQuery("blockedChatList", fetchBlockedChatList);
  const blockedChatList = resData?.data.blockList;

  /* 유저 차단을 시키는 함수 */
  const toggleBlock = useToggleBlockMutation();

  /* 유저 차단을 토글하는 함수입니다. */
  const handleBlock = async () => {
    await toggleBlock.mutateAsync();
    alert("처리되었습니다");
  };

  return (
    <div className={styled.settingChatBox}>
      <h3 className={styled.h3}>채팅 차단</h3>
      {!blockedChatList || blockedChatList.length === 0 ? (
        <p className={styled.p}>1:1 채팅을 차단한 멤버가 없습니다.</p>
      ) : (
        <ul className={styled.ul}>
          {blockedChatList.map((user) => (
            <div className={styled.listBox}>
              <li className={styled.li} key={user.id}>
                {user.block_user}
              </li>
              <button className={styled.blockBtn} onClick={handleBlock}>
                차단해제
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SettingChat;
