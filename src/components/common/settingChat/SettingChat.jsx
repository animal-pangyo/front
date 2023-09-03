import styled from "./SettingChat.module.css";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {fetchBlockedChatList} from "../../../services/api/chat.api";

const SettingChat = () => {
    const { data: blockedChatList, isLoading, isError } = useQuery('blockedChatList', fetchBlockedChatList);

    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }
  
    // if (isError) {
    //   return <div>Error fetching blocked chat list</div>;
    // }
    
    return(
        <div className={styled.settingChatBox}>
            <h3 className={styled.h3}>채팅 차단</h3>
            {!blockedChatList || blockedChatList.length === 0 ? (
                <p className={styled.p}>1:1 채팅을 차단한 멤버가 없습니다.</p>
            ) 
            : 
            (
            <ul>
                {blockedChatList.map((chat) => (
                    <li key={chat.id}>{chat.text}</li>
                ))}
            </ul>
            )}
        </div>
    
    )
};

export default SettingChat;