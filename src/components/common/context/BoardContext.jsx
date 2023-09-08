import { useContext, useEffect } from "react";
import styled from "./board-context.module.css";
import { useSetRecoilState } from "recoil";
import { chatingIdState } from "../../../store/chat";
import {
  useCheckBlockQuery,
  useToggleBlockMutation,
} from "../../../hooks/useChat";
import { useQueryClient } from "react-query";
import { getUserId } from "../../../services/api";
import { SocketContext } from "../../../context/socket";

/* onClose: 컨텍스트 메뉴를 종료하는 함수입니다. */
/* id: 채팅하려는 상대방 아이디입니다 */
const BoardContext = ({ onClose, id }) => {
  const queryClient = useQueryClient();
  const checkBlock = useCheckBlockQuery(id);
  const toggleBlock = useToggleBlockMutation();
  const setChatingIdState = useSetRecoilState(chatingIdState);
  const socket = useContext(SocketContext);

  useEffect(() => {
    /* 컨텍스트메뉴 영역 밖을 선택할 시 컨텍스트 메뉴를 종료하는 함수입니다. */
    const close = (e) => {
      const target = e.target;
      if (
        target.matches(".board-context") ||
        target.matches(".board-context div")
      )
        return;

      onClose(false);
    };

    /* 컨텍스트 메뉴 종료 이벤트 핸들러 등록 */
    document.addEventListener("click", close);

    return () => {
      /* 컨텍스트 메뉴 종료 이벤트 핸들러 제거 */
      document.removeEventListener("click", close);
    };
  }, []);

  /* 상대와의 1:1 채팅 모달을 여는 함수입니다. */
  const open = async () => {
    setChatingIdState(id);

    /* 채팅 입장 시 채팅룸 생성을 위해 서버로 요청합니다. */
    socket.socket.emit("joinRoom", {
      userId: getUserId(),
      target: id,
    });

    // 컨텍스트 종료
    onClose(false);
  };

  /* 상대가 차단되어 있는 경우 차단해제하는 함수입니다. */
  const handleCancelBlock = async () => {
    await toggleBlock.mutateAsync(id);

    /* 차단해제 후 차단해제 상태를 저장합니다 */
    queryClient.invalidateQueries(["chat", "block"]);
    alert("차단해제 되었습니다.");
  };

  return (
    <div className={`board-context ${styled.context}`}>
      {checkBlock.data ? (
        /* 상대가 차단되어 있는 경우 차단해제를 렌더링합니다.*/
        <div onClick={handleCancelBlock}>차단해제</div>
        ) : (
        /* 상대가 차단되어 있지 않은 경우 채팅을 렌더링합니다. */
        <div onClick={open}>채팅</div>
      )}
    </div>
  );
};

export default BoardContext;
