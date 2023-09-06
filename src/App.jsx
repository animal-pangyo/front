import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useQueryClient } from "react-query";
import styled from "./app.module.css";
import useMessage from "./hooks/useMessage";
import routes from "./routes";
import { useEffect } from "react";
import { getAuthorization, getUserId, setAuthorization } from "./services/api";
import { SocketContext, socket } from "./context/socket";

function App() {
  // 화면 상단에 메시지를 표시하기 위해서 사용합니다.
  const [message] = useMessage();

  // 라우트 정보를 바탕으로 브라우저 라우터를 생성합니다.
  const router = createBrowserRouter(routes);

  /* 리액트 쿼리 스토어에 접근하기 위한 훅입니다. */
  const queryClient = useQueryClient();

  useEffect(() => {
    // 저장된 엑세스 토큰을 가져오기 위해서 사용합니다.
    const token = getAuthorization();

    // 저장된 유저 아이디 정보를 가져오기 위해서 사용합니다.
    const userId = getUserId();

    // 새로고침 시 엑세스 토큰이 존재하는 경우 자동 로그인 하기 위해서 사용합니다.
    // 토큰이 존재하는 경우 유저정보를 유효하지 않은 상태로 만들어 다시 서버로부터 유저 정보를 로드하도록 합니다.
    if (token) {
      setAuthorization(token, userId);
      // 유효하지 않은 상태로 만들어 정보 리로드
      queryClient.invalidateQueries("user");
    } else {
      // 토큰은 존재하지 않지만 유저 아이디가 남아있는 경우 모두 제거하기 위해서 초기화합니다.
      setAuthorization('', '');
    }
  }, []);

  return (
    <>
      {/* 메시지 알림을 보여주기 위해서 렌더링 합니다. 메시지가 존재하는 경우 상단에 메시지를 보여줍니다. */}
      <div
        className={`ui compact message yellow ${styled.message}`}
        style={
          message.visible ? { display: "inline-block" } : { display: "none" } // 메시지 visible이 true인 경우 화면에 보여주고 아닌 경우 화면에 보여주지 않습니다.
        }
      >
        <p>{message.message}</p> {/* message 출력 */}
      </div>

      {/* 라우터를 토대로 URL에 따라 페이지를 렌더링하게 됩니다. */}
      <SocketContext.Provider value={socket}>
        <RouterProvider router={router} />
      </SocketContext.Provider>
    </>
  );
}

export default App;
