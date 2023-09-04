import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { chatWebsocketState } from '../store/chat';
import * as chatApi from '../services/api/chat.api';

/* 채팅 시작하기 위한 훅입니다 */
export const useChatStartMutation = () => {
  /* 리액트 쿼리 스토어에 접근하기 위한 훅입니다. */
  const queryClient = useQueryClient();
  /* 현재 채팅중인 아이디를 저장하고 있는 상태입니다. */
  const [chatWebsocketValue, setChatWebsocket] = useRecoilState(chatWebsocketState);
  return useMutation({
    mutationFn(id) {
      /* 웹소켓을 통해 채팅을 시작합니다. */
      const websocket = new WebSocket('ws://localhost:8081');
      
      /* 웹소켓이 오픈되면 기존 웹소켓은 종료하고 새로운 웹소켓을 상태로 저장합니다. */
      websocket.onopen = () => {
        if (chatWebsocketValue && !chatWebsocketValue.CLOSED) {
          chatWebsocketValue.close();
        }

        setChatWebsocket(websocket);
      };

      /* 메시지를 전달받으면 서버로 채팅내용을 전달받습니다. */
      websocket.onmessage = () => {
        queryClient.invalidateQueries(['chat', id]);
      };
    }
  });
}

/* 채팅룸에 해당하는 채팅내용을 가져옵니다. */
/* id: 채팅룸 아이디 */
export const useChatQuery = (id) => (
  useQuery({
    queryKey: ['chat', id],
    async queryFn() {
      /* 서버로부터 id에 해당하는 채팅내용을 가져옵니다. */
      const response = await chatApi.chat(id);
      return response.data;
    },
    enabled: !!id,
  })
);

/* 해당 유저에 대한 차단여부를 가져오는 쿼리입니다. */
export const useCheckBlockQuery = (id) => (
  useQuery({
    queryKey: ['chat', 'block', id],
    async queryFn() {
      /* 해당 유저에 대한 차단여부를 가져오는 쿼리입니다. */
      const response = await chatApi.checkBlock(id);
      return response.data;
    },
  })
)

/* 해당 유저에 대한 차단을 토글하는 API입니다. */
export const useToggleBlockMutation = () => (
  useMutation({
    mutationFn(id) {
      /* 해당 유저에 대한 차단을 토글하는 API입니다. */
      return chatApi.toggleBlock(id);
    }
  })
)

/* 해당 유저와의 채팅룸을 완전히 삭제하는 API입니다. */
export const useDeleteChatMutation = () => (
  useMutation({
    mutationFn(id) {
      /* 해당 유저와의 채팅룸을 완전히 삭제하는 API입니다. */
      return chatApi.deleteChat(id);
    }
  })
);

/* 채팅시 이미지를 업로드하는 API입니다. */
export const useUploadFileMutation = () => (
  useMutation({
    mutationFn(data) {
      /* 채팅시 이미지를 업로드하는 API입니다. */
      return chatApi.uploadFile(data);
    }
  })
)