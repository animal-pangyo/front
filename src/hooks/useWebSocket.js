import { useState, useEffect } from 'react';
import { getUserId } from "../services/api";

/* main page 채팅 관련 websocket hook을 만들어 사용합니다.  */
function useWebSocket(socketUrl) {
  // 소켓, 메시지 수 및 메시지에 대한 상태 변수를 초기화합니다.
  const [socket, setSocket] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const userId = getUserId();

   // useEffect 훅을 사용하여 컴포넌트 렌더링 시나 socketUrl이 변경될 때 부수 효과를 수행합니다.  
  useEffect(() => {
    const newSocket = new WebSocket(socketUrl);

    // 소켓이 열릴 때 실행될 콜백 함수를 정의합니다.
    newSocket.open = () => {
      setSocket(newSocket);

      console.log("socket open main")
      // 서버로 초기 메시지를 보냅니다.
      newSocket.send(JSON.stringify({
        event: '/chat/msgNcnt',
        data: {
          id: userId,
        },
      }));
    }

     // 소켓으로부터 메시지가 도착했을 때 실행될 콜백 함수를 정의합니다.
    newSocket.onmessage = (event) => {
      const messageCount = event.data.count; // 메시지 카운트 업데이트
      const newMessage = event.data.message; // 새로운 메시지 업데이트
      setMessages(newMessage);
      setMessageCount(messageCount);
    };

    // 컴포넌트가 언마운트될 때 소켓을 닫습니다.
    return () => {
      newSocket.close();
    };
  }, [socketUrl]);

    // 소켓, 메시지 수, 메시지를 반환합니다.
  return { socket, messageCount, messages };
}

export default useWebSocket;
