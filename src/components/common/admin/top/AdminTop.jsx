import { NavLink } from "react-router-dom";
import styled from "./admin-top.module.css";
import useAuth from "../../../../hooks/useAuth";
import JoinModal from "../../../modal/joinModal/JoinModal";
import ChatModal from "../../../modal/chatModal/chatModal";
import useMessage from "../../../../hooks/useMessage";
import PreviewMessage from "../../Preview/previewMessage";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { msgCntState, latestMessageState, chatingIdState } from "../../../../store/chat";

/* 상단 유저와 관련 된 정보를 보여주기 위한 컴포넌트입니다 */
const AdminTop = ({unReadMsgCnt}) => {
  //msg count 리코일 상태 저장소에서 가져옵니다. 
  const messageCount = useRecoilValue(msgCntState);
  //미리보기 msg를 리코일 상태 저장소에서 가져옵니다. 
  const latestMessage = useRecoilValue(latestMessageState);

  const [msgCount, setMsgCount] = useState(unReadMsgCnt);

  const setChatingIdState = useSetRecoilState(chatingIdState)

  useEffect(()=>{
    if(typeof messageCount !== 'number'){
      return;
    }
    setMsgCount(messageCount)
   
  },[messageCount])


  /* user : 유저에 대한 객체 */
  /* logout : 로그아웃 기능을 하기 위함 함수 */
  const { user, logout } = useAuth();

  /* 유저 정보 수정하기 위한 팝업을 숨김 처리하기 위한 상태 생성 */
  const [open, setOpen] = useState(false);

  /* 채팅 팝업을 숨김 처리하기 위한 상태 생성 */
  const [chatOpen, setChatOpen] = useState(false);

  /* 화면 상단 메시지를 출력하기 위한 setMessage 함수 */
  const [, setMessage] = useMessage();

  const logoutHandler = () => {
    setOpen(false);
    setChatOpen(false);
    setChatingIdState('');
    logout();
  }

  /* 유저와 관련 된 처리를 하기 위한 훅입니다. */
  const auth = useAuth();

  /* 회원 정보 수정 후 호출하기 위한 함수 */
  const onSubmit = async (data) => {
    /* 유저 정보 입력 완료 후 정보를 서버로 전달 */
    await auth.updateProfile({
      ...data,
      userId: user.id,
    });

    /* 유저 정보 수정용 팝업 종료합니다. */
    setOpen(false);

    /* 수정되었습니다 메시지를 출력하기 위해 setMessage함수를 호출합니다. */
    setMessage({
      visible: true,
      message: "수정되었습니다.",
    });
  };

  /* socket message */

  return (
    <>
      {/* className : className이름 설정 */}
      <div className={styled.top}>
        {/* className : className이름 설정 */}
        <div className={styled.left}></div>
        {/* className : className이름 설정 */}
        <div className={styled.right}>
          {
            /* 유저 존재 여부에 따라 분기 처리 */
            user ? (
              <>
                <div className={styled.chat} onClick={() => setChatOpen(true)}>
                   {/* "채팅" 텍스트를 렌더링하고, 클릭 시 setChatOpen 함수를 호출하여 채팅창을 엽니다. */}
                  채팅
                   {/* 만약 msgCount가 0보다 크다면 다음을 렌더링합니다. */}
                  { msgCount > 0 && (
                    <div className={styled.chatCircle}>
                      {/* 채팅 메시지 개수를 나타내는 원 모양 아이콘 */}
                      <span className={styled.messageCount}>
                          {/* msgCount 변수의 값을 표시 */}
                        { msgCount}
                      </span>
                    </div>
                  )}
                </div>
                {/* className : className이름 설정 */}
                <div className={styled.user}>
                  {/* onClick : 유저 아이디 클릭 시 호출 될 함수 */}
                  <span onClick={() => setOpen(true)}>
                    {user.id} 님 환영합니다.
                  </span>
                  {/* className : className이름 설정 */}
                  {/* onClick : 로그아웃 텍스트 클릭 시 호출 될 함수 */}
                  <div className={styled.logout} onClick={logoutHandler}>
                    로그아웃
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* to : 이동할 페이지 */}
                {/* 로그인 페이지로 이동 */}
                <div>
                  <NavLink to="/login">로그인</NavLink>
                </div>
                {/* to : 이동할 페이지 */}
                {/* 회원가입 페이지로 이동 */}
                <div>
                  <NavLink to="/join">회원가입</NavLink>
                </div>
              </>
            )
          }
        </div>
         {/* 채팅 모달 컴포넌트 추가 */}
        <ChatModal open={chatOpen} setOpen={setChatOpen} />

        {/* 유저 정보를 수정하기 위해 사용되는 모달 */}
        {/* user : 유저 정보 */}
        {/* open : 모달이 보여줄지 여부 결정하기 위한 상태 */}
        {/* setOpen : open 상태를 변경하기 위한 함수 */}
        {/* onSubmit : 유저 정보 수정 완료 후 호출될 함수 */}
        <JoinModal
          user={user}
          open={open}
          setOpen={setOpen}
          onSubmit={onSubmit}
        />
          {/* latestMessage 가 있을 때 미리보기 컴포넌트를 렌더링 */}
       {latestMessage ? <PreviewMessage latestMessage={latestMessage} /> : null} 
      </div>
    </>
  );
};

export default AdminTop;
