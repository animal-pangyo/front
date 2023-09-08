import styled from "./SettingChat.module.css";
import { useQuery } from "react-query";
import { fetchBlockedChatList } from "../../../services/api/chat.api";
import { useDeleteChatMutation, useToggleBlockMutation } from "../../../hooks/useChat";
import { useSetRecoilState } from "recoil";
import { chatingIdState } from "../../../store/chat";

const SettingChat = () => {
  const {
    data: resData,
    isLoading,
    isError,
  } = useQuery("blockedChatList", fetchBlockedChatList);
  const blockedChatList = resData?.data?.blockList;

  /* 유저 차단을 시키는 함수 */
  const toggleBlock = useToggleBlockMutation();
  // 대화룸 삭제하는 함수
  const deleteChat = useDeleteChatMutation();
  const setChatingIdState = useSetRecoilState(chatingIdState);

  /* 유저 차단을 토글하는 함수입니다. */
  const handleBlock = async (user_id) => {
    if (!window.confirm('차단 시 모든 대화가 삭제됩니다. 차단하시겠습니까?')) {
      return;
    }
    
    // 유저와의 대화 삭제
    await deleteChat.mutateAsync(chatidx);

    // 유저 차단 해제
    await toggleBlock.mutateAsync(user_id);
    alert("처리되었습니다");
    setChatingIdState("");
    fetchBlockedChatList();
  };

  return (
    <div className={styled.settingChatBox}>
      <h3 className={styled.h3}>채팅 차단</h3>
      {/* 차단한 유저가 존재하지 않는 경우 차단 멤버 존재하지 않는다고 렌더링합니다. */}
      {!blockedChatList || blockedChatList.length === 0 ? (
        <p className={styled.p}>1:1 채팅을 차단한 멤버가 없습니다.</p>
      ) : (
        /* 차단한 유저가 존재하는 경우 차단 유저 리스트를 렌더링합니다. */
        <ul className={styled.ul}>
          {blockedChatList.map((user) => (
            <div className={styled.listBox}>
              <li key={user.idx}>{user.user_id}</li>
              {/* 차단 해제 버튼을 클릭 하는 경우 해당 유저를 차단 해제 합니다. */}
              <button
                className={styled.blockBtn}
                onClick={() => handleBlock(user.user_id)}
              >
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
