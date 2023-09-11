import AdminNav from "../../common/admin/nav/AdminNav";
import AdminTop from "../../common/admin/top/AdminTop";
import styled from "./admin-layer.module.css";
import { useContext, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { chatingIdState } from "../../../store/chat";
import { useChatQuery, useUnreadMessageCountQuery } from "../../../hooks/useChat";
import Chat from "../../chat/Chat";
import { SocketContext } from "../../../context/socket";
import { getUserId } from "../../../services/api";

/* 로그인, 회원가입, 아이디찾기, 비밀번호 찾기 페이지를 제외한 공통적으로 사용하는 레이어 컴포넌트입니다. */
/* children : 해당 레이어에 렌더링한 컴포넌트를 전달받습니다. */
const AuthLayer = ({ children }) => {
  /* 현재 채팅중인지 여부를 가져오는 상태입니다. */
  const chatingId = useRecoilValue(chatingIdState);
  /* 채팅중인 경우 해당 채팅 내용을 가져오게 됩니다. */
  const list = useChatQuery(chatingId);
  /* 소켓 상태를 가져옵니다. */
  const socket = useContext(SocketContext);
  /* 유저가 읽지 않은 메시지 개수를 가져옵니다. */
  const userId = getUserId();

  const unReadMsgQuery = useUnreadMessageCountQuery(userId);
  const unReadMsgCnt = unReadMsgQuery.data;

  /* 어플리케이션에 접속 후 로그인 상태라면 소켓을 연결합니다. */
  useEffect(() => {
    if (getUserId()) {
      socket.connectSocket();
    }

    return () => {
      if (socket.socket) {
        socket.close();
      }
    }
  }, []);

  return (
    /* className : className이름 설정 */
    <div className={styled.layer}>
      {/* 좌측 네비게이션 컴포넌트 렌더링 */}
      <AdminNav />
      {/* className : className이름 설정 */}
      <div className={styled.right}>
        {/* 상단 유저관련 컴포넌트 렌더링 */}
        <AdminTop unReadMsgCnt={unReadMsgCnt}/>
        {/* className : className이름 설정 */}
        <main className={styled.content}>
          {/* 전달받은 자식 컴포넌트 렌더링 */}
          {children}
        </main>
        {/* 채팅중인 경우 채팅 컴포넌트를 렌더링합니다. */}
        {list.data && <Chat data={list.data} />}
      </div>
    </div>
  );
};

export default AuthLayer;
