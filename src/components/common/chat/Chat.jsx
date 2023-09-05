import styled from "./Chat.module.css";
import ChatListItem from "../chatList/ChatListItem";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchChatList } from "../../../services/api/chat.api";

const Chat = () => {


    const { data: resData , isLoading, isError } = useQuery('chatList', fetchChatList);
    const chatList = resData?.data.data;
    // console.log("chafgs", chatList)
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    
    // if (isError) {
    //   return <div>Error fetching chat list</div>;
    // }

    // const chatList = [ {userId:"dsfsf", content:"아녀아나하우ㅏㅇ니안", date:"2023-02-22"}, {userId:"dsfsf", content:"아녀아나하우ㅏㅇ니안", date:"2023-02-22"}, {userId:"dsfsf", content:"아녀아나하우ㅏㅇ니안", date:"2023-02-22"}, 
    // {userId:"qwdaz2222", content:"누ㅏㅣ뉘sdfdsㅏㅇ룬", date:"2023-02-22"},
    // {userId:"qweq", content:"가나아다루ㅏ니이나", date:"2023-02-22"}, {userId:"qweq", content:"가나아다루ㅏ니이나", date:"2023-02-22"}, {userId:"qweq", content:"가나아다루ㅏ니이나", date:"2023-02-22"}]
       
    return (
        <div className={styled.chatBox}>
            {   
            
            !chatList || chatList.length === 0 ?

                <div className={styled.msgBox}>
                    <p>참여 중인 채팅이 없습니다. </p>
                    <p>자유게시판을 통해 멤버와 채팅을 시작하세요.</p>
                </div>
            : 
                /* 채팅 리스트 아이템을 매핑하여 출력 */
                <div className={styled.chatList}>
                    {chatList && chatList.map((msgListItem, idx) => (
                        <ChatListItem key={idx} msgListItem={msgListItem} />
                    ))}
                </div>

            }

       

        </div>
      );
}

export default Chat;