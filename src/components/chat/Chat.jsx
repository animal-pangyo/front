import { createPortal } from "react-dom";
import styled from "./chat.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import {
  useToggleBlockMutation,
  useDeleteChatMutation,
  useUploadFileMutation,
  useCheckBlockQuery,
  useCheckBlockToMeQuery,
} from "../../hooks/useChat";
import { useSetRecoilState } from "recoil";
import { chatingIdState } from "../../store/chat";
import { useQueryClient } from "react-query";
import useAuth from "../../hooks/useAuth";
import { SocketContext } from "../../context/socket";
import { getUserId } from "../../services/api";

/* 채팅내용 리스트를 렌더링하는 컴포넌트입니다. */
/* list: 채팅내용 */
const ChatList = ({ list }) => {
  const { user } = useAuth();
  return (
    <div className={`${styled.chatbox} chatbox`}>
      {/* 리스트가 존재하는 경우 리스트를 렌더링합니다. */}
      {list.length ? (
        <ul className={styled.chatlist}>
          {
            /* msg: 채팅내용 */
            /* authorId: 상대방 아이디 */
            /* createdAt: 채팅 시간 */
            /* img: 채팅 이미지 */
            /* index: 인덱스 */
            list.map(({ msg, createdAt, img, author_id }, index) => (
              /* 상대가 입력한 채팅은 left, 로그인한 대상이 입력한 채팅은 right_on을 classname으로 지정합니다. */
              <li
                key={index}
                className={`${author_id === user.id ? styled.right_on :  "left" }`}
              >
                {/* 채팅이 이미지라면 이미지 컴포넌트를 렌더링합니다. */}
                {img ? (
                  <img src={`uploads/${img}`} />
                ) : (
                  /* 채팅이 텍스트라면 텍스트를 렌더링합니다/ */
                  <span>{msg}</span>
                )}

                {/* 시간을 렌더링합니다. */}
                <span className={styled.time}>{createdAt}</span>
              </li>
            ))
          }
        </ul>
      ) : (
        /* 채팅목록이 존재하지 않는 경우 '채팅이 존재하지 않습니다'를 렌더링합니다. */
        <div className={styled.empty}>채팅이 존재하지 않습니다.</div>
      )}
    </div>
  );
};

/* 우측 채팅 설정을 렌더링하는 컴포넌트입니다. */
/* users: 채팅중인 유저 */
/* visible: 채팅 설정을 보여줄지 여부를 결정 */
/* close: 채팅 설정을 종료하는 함수 */
const Right = ({ users, visible, close, chatidx }) => {
  const user = getUserId();
  const checkBlock = useCheckBlockQuery(users.target);
  /* 유저 차단을 시키는 함수 */
  const toggleBlock = useToggleBlockMutation();
  /* 채팅룸을 제거하는 함수 */
  const deleteChat = useDeleteChatMutation();
  const [isUser, setIsUser] = useState(false);
  const setChatingIdState = useSetRecoilState(chatingIdState);

  /* 채팅룸 나가기 버튼 클릭시 호출되는 함수입니다. */
  const exit = async () => {
    if (
      !confirm(
        "채팅방을 나가시겠습니까? 대화방은 대화중인 모든 유저의 목록에서 삭제되고 대화 내용을 다시 볼 수 없습니다."
      )
    ) {
      return;
    }

    /* 채팅룸 나가기 확인 후 채팅룸을 제거합니다/ */
    await deleteChat.mutateAsync(chatidx);
    alert("처리되었습니다");
    setChatingIdState("");
  };

  /* 컴포넌트레 렌더링 되면 유저모드를 false로 초기화합니다. */
  useEffect(() => {
    setIsUser(false);
  }, [visible]);

  /* 유저 차단을 토글하는 함수입니다. */
  const handleBlock = async () => {
    await toggleBlock.mutateAsync(users.target);
    alert("처리되었습니다");
  };

  return (
    <div className={`${styled.right} ${visible ? styled.on : ""}`}>
      {/* 대화설정을 클릭하지 않은 경우 */}
      {!isUser ? (
        <div>
          {/* 모달 종료버튼입니다. */}
          <div className={styled.close} onClick={() => close(false)}></div>
          <div className={styled.users}>
            <div>
              <div className={styled.right_header}>대화멤버 2</div>
            </div>
            {/* 현재 채팅중인 유저를 렌더링합니다. */}
            <div className={styled.userlist}>
              <div>{user}</div>
              <div>{users.target}</div>
            </div>
          </div>
          {/* 채팅 설정 버튼을 렌더링합니다. */}
          <div className={styled.buttons}>
            {/* 대화설정 클릭 시 새로운 설정을 렌더링하는 함수입니다. */}
            <button onClick={() => setIsUser(true)}>대화 설정</button>
            {/* 나가기 버튼 클릭 시 채팅룸을 종료합니다. */}
            <button onClick={exit}>나가기</button>
          </div>
        </div>
      ) : (
        /* 대화설정을 클릭한 경우 렌더링합니다. */
        <div className={styled.block_div}>
          {/* 모달 종료버튼입니다. */}
          <div className={styled.close} onClick={() => close(false)}>
            <span>대화설정</span>
          </div>
          {/* 로그인한 유저의 프로필을 보여줍니다. */}
          <div className={styled.profile}>{user}</div>
          <div className={styled.block}>
            {/* 채팅 중인 상대를 차단 또는 차단해제합니다. */}
            <span onClick={handleBlock}>
              {checkBlock.data ? ('차단해제') :('대화차단')}
            </span>
          </div>
          <div className={styled.buttons}>
            {/* 채팅 설정의 이전 화면으로 돌아갑니다. */}
            <button onClick={() => setIsUser(false)}>이전으로</button>
          </div>
        </div>
      )}
    </div>
  );
};

/* 
  list: 현재 채팅내용 리스트
  users: {
    user: 로그인한 유저,
    target: 상대 유저
  },
  chatidx: 채팅룸 아이디
*/
const Chat = ({ data }) => {
  const checkBlock = useCheckBlockQuery(data.users.target);
  const checkBlockToMe = useCheckBlockToMeQuery(data.users.target);
  const queryClient = useQueryClient();
  /* 이미지를 업로드하는 함수입니다. */
  const uploadFile = useUploadFileMutation();
  const setChatingIdState = useSetRecoilState(chatingIdState);
  /* 채팅설정을 오픈하는 상태입니다. */
  const [isOpen, setIsOpen] = useState(false);
  /* 채팅입력을 저장하는 상태입니다. */
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const socket = useContext(SocketContext);
  const userId = getUserId();

  /* 채팅 텍스트 입력 시 웹소켓으로 전달합니다. */
  const handleChange = (e) => {
    setText(e.target.value);
  };

  /* 채팅설정을 오픈하는 함수입니다. */
  const open = () => {
    setIsOpen(true);
  };

  /* 이미지 업로드할 수 있도록 합니다. */
  const handleUploadClick = () => {
    inputRef.current.click();
  };

  /* 이미지를 선택 후 이미지를 업로드하는 함수입니다, */
  const handleUploadFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const filename = file.name;

    /* 이미지 파일만 업로드 가능합니다. */
    if (!filename.match(/.(png|jpg|jpeg|git|svg)$/)) {
      alert("이미지만 업로드 가능합니다.");
      e.target.value = "";
      return;
    }

    const form = new FormData();
    /* 이미지 바이너리 데이터입니다. */
    form.append("image", file, filename.name);
    /* 로그인한 유저입니다. */
    form.append("userid", userId);

    try {
      await uploadFile.mutateAsync({
        form,
        chatidx: data.chatidx,
      });

      /* 채팅 내용 리스트를 초기화합니다. */
      queryClient.invalidateQueries(["chat", data.users.target]);
    } catch {
      alert("문제가 발생하였습니다. 잠시 후 다시 이용해주시기 바랍니다.");
    } finally {
      inputRef.value = "";
    }
  };

  // 서버로 채팅 내용을 전달합니다/
  const submit = () => {
    // 내용을 입력하지 않으면 종료합니다.
    if (!text.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    // 웹소켓이 존재하지 않으면 종료합니다.
    if (!socket.socket) {
      return;
    }

    // 전송 버튼 클릭 시 채팅 내용을 서버로 전달
    socket.socket.emit("sendMessage", {
      text,
      id: userId,
      target: data.users.target,
    });

    // 전송 후 텍스트 초기화
    setText('');
  };

  useEffect(() => {
    const chatbox = document.querySelector('.chatbox');
    document.querySelector('.chatbox').scrollTo({
      top: chatbox.scrollHeight,
    });
  }, [data.list]);

  // textarea에서 엔터키를 입력했을 때 전송되는 기능
  const handleKeyup = (e) => {
    e.preventDefault();

    /* 쉬프트와 엔터를 동시에 입력하면 개항만 가능 */
    if (e.code === 'Enter' && e.shiftKey) {
      return;
    }

    /* 엔터 입력 시 전송 */
    if (e.code === 'Enter' && text.trim()) {
      e.preventDefault();
      submit();
    }
  };

  return createPortal(
    <div className={styled.chat}>
      {/* 채팅설정을 하는 경우 커버를 렌더링합니다. */}
      <div className={`${styled.cover} ${isOpen ? styled.on : ""}`}></div>
      <header className={styled.header}>
        {/* 채팅중인 상대의 아이디를 렌더링합니다. */}
        <div>{data.users.target}</div>
        {/* 햄버거 메뉴를 렌더링합니다. */}
        <div className={styled.menu}>
          {/* 햄버거 클릭 시 채팅 설정을 오픈합니다. */}
          <div className={styled.hamburger} onClick={open}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {/* 1:1 채팅 모달을 종료합니다. */}
          <div
            onClick={() => setChatingIdState("")}
            className={styled.close}
          ></div>
        </div>
      </header>
      {/* 채팅 내용을 렌더링합니다. */}
      {/* list: 채팅대화 리스트 */}
      <ChatList list={data.list} />
      <div className={styled.input}>
        {/* 이미지를 업로드할 수 있는 버튼입니다. */}
        {/* onClick: 클릭 시 이미지를 선택할 수 있습니다. */}
        {/* onChange: 이미지를 선택한 경우 이미지를 업로드합니다. */}
        <div
          className={styled.image}
          onClick={handleUploadClick}
          onChange={handleUploadFile}
        >
          <span></span>
          <span></span>
          <input
            ref={inputRef}
            type="file"
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>
        {/* 채팅 내용을 입력할 수 있습니다. */}
        {/* disabled: 차단 여부에 따라 활성화 여부를 결정 */}
        <textarea 
          ref={textareaRef}
          value={text} 
          onChange={handleChange} 
          disabled={checkBlock.data || checkBlockToMe.data} 
          placeholder={(checkBlock.data || checkBlockToMe.data) ? '차단되었습니다.' : ''}
          onKeyUp={handleKeyup}
        />
        {/* 버튼 클릭 시 메시지 전송 */}
        {/* disabled: 차단 여부에 따라 활성화 여부를 결정 */}
        <button type="button" onClick={submit} disabled={checkBlock.data || checkBlockToMe.data}>
          전송
        </button>
      </div>
      {/* 채팅설정 컴포넌트를 렌더링합니다. */}
      {/* visible: 채팅설정을 보여줄지 여부를 결정합니다. */}
      {/* close: 채팅설정을 종료합니다. */}
      <Right
        users={data.users}
        visible={isOpen}
        chatidx={data.chatidx}
        close={setIsOpen}
      />
    </div>,
    document.querySelector("body")
  );
};

export default Chat;
