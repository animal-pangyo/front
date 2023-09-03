import { useState, useEffect } from 'react';

function useWebSocket(socketUrl) {
  const [socket, setSocket] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = new WebSocket(socketUrl);

    newSocket.onmessage = (event) => {
      const messageCount = event.data.count
      const newMessage = event.data.message;
      setMessages(newMessage);
      setMessageCount(messageCount);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [socketUrl]);

  return { socket, messageCount, messages };
}

export default useWebSocket;
