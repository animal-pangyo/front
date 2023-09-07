import { useMutation, useQuery, useQueryClient } from "react-query";
import * as chatApi from "../services/api/chat.api";

/* 채팅룸에 해당하는 채팅내용을 가져옵니다. */
/* id: 채팅룸 아이디 */
export const useChatQuery = (id) =>
  useQuery({
    queryKey: ["chat", id],
    async queryFn() {
      /* 서버로부터 id에 해당하는 채팅내용을 가져옵니다. */
      const response = await chatApi.chat(id);
      return response.data;
    },
    enabled: !!id,
  });

/* 해당 유저에 대한 차단여부를 가져오는 쿼리입니다. */
export const useCheckBlockQuery = (id) =>
  useQuery({
    queryKey: ["chat", "block", id],
    async queryFn() {
      /* 해당 유저에 대한 차단여부를 가져오는 쿼리입니다. */
      const response = await chatApi.checkBlock(id);
      return response.data;
    },
  });

/* 해당 유저에 대한 차단을 토글하는 API입니다. */
export const useToggleBlockMutation = () =>
  useMutation({
    mutationFn(id) {
      /* 해당 유저에 대한 차단을 토글하는 API입니다. */
      return chatApi.toggleBlock(id);
    },
  });

/* 해당 유저와의 채팅룸을 완전히 삭제하는 API입니다. */
export const useDeleteChatMutation = () =>
  useMutation({
    mutationFn(chatidx) {
      /* 해당 유저와의 채팅룸을 완전히 삭제하는 API입니다. */
      return chatApi.deleteChat(chatidx);
    },
  });

/* 채팅시 이미지를 업로드하는 API입니다. */
export const useUploadFileMutation = () =>
  useMutation({
    mutationFn(data) {
      /* 채팅시 이미지를 업로드하는 API입니다. */
      return chatApi.uploadFile(data);
    },
  });
