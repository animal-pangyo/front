import React, { useState } from 'react';
import io from "socket.io-client";
import { getUserId } from '../services/api';
import { useQueryClient } from 'react-query';

export const useSocket = () => {
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState(null);
  const [msgCnt, setMsgCnt] = useState(0);
  const [latestMsg, setLatestMsg] = useState('');

  const connectSocket = () => {
    if (socket) {
      socket.disconnect();  
    }

    /* 서버와의 웹소켓 연결을 시작합니다 */
    const newSocket = io("http://localhost:9002");
    setSocket(newSocket);
    on(newSocket);
  };

  const on = (socket) => {
    /* 웹소켓 연결에 오류가 발생하는 경우 연결됩니다. */
    socket.on("error", (error) => {
      console.error("웹소켓 연결 오류:", error);
    });

    /* 웹소켓 연결이 해제 되는 경우 호출됩니다. */
    socket.on("disconnect", (reason) => {
      console.log("웹소켓 연결 끊김:", reason);
    });

    /* 웹소켓이 오픈되면 기존 웹소켓은 종료하고 새로운 웹소켓을 상태로 저장합니다. */
    socket.on("connect", () => {
      /* 웹소켓 연결 완료 시 서버에 아이디를 등록합니다. */
      socket.emit("/chat/open", getUserId());
    });

    /* 메시지를 전달받으면 서버로 채팅내용을 전달받습니다. */
    socket.on("message", (e) => {
      queryClient.invalidateQueries(["chat", e.target]);
    });
  };

  const close = () => {
    if (!socket) return;

    socket.disconnect();
    setSocket(null);
  }

  return {
    socket,
    msgCnt,
    latestMsg,
    connectSocket,
    close
  }
};

export const SocketContext = React.createContext();