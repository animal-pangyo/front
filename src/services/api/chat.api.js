import axios, { URL, getUserId } from ".";

/* main page 채팅 클릭 시 유저가 대화중인 채팅 리스트를 불러오는 api */
export const fetchChatList = () => {
  const userId = getUserId();
  try {
    return axios.get(`${URL}/user/chat/${userId}`, {
      headers: {
        Accept: "application/json", // JSON 응답을 요청합니다.
      },
    });
  } catch (error) {
    throw new Error("Error fetching chat list");
  }
};

export const fetchBlockedChatList = () => {
  const userId = getUserId();
  try {
    return axios.get(`${URL}/user/block/${userId}`);
  } catch (error) {
    throw new Error("Error fetching block list");
  }
};

/* 채팅 리스트를 불러오는 api */
export const chat = (target) => {
  const userId = getUserId();
  console.log("fortnt userID", userId)
  return axios.post(`${URL}/chat`, {
    userId,
    target,
  });
};

/* 해당 유저가 차단되었는지 확인하는 api */
/* id: 차단하려는 유저 아이디 */
export const checkBlock = (blockId) => {
  const id = getUserId();
  return axios.post(`${URL}/user/isBlock`, {
    id,
    blockId,
  });
};

/* 해당 유저의 차단 여부를 토글하는 api */
/* id: 차단하려는 유저 아이디 */
export const toggleBlock = (blockId) => {
  const id = getUserId();
  return axios.patch(`${URL}/user/block`, {
    id,
    blockId,
  });
};

/* 해당 유저와의 채팅룸 삭제하는 api */
/* chatidx: 삭제하려는 채팅룸 번호 */
export const deleteChat = (chatidx) => axios.delete(`${URL}/chat/${chatidx}`);

/* 채팅에 이미지를 업로드할때 사용하는 api */
/* form: 업로드 하려는 이미지 바이너리 데이터 */
/* chatidx: 채팅룸 아이디 */
export const uploadFile = ({ form, chatidx }) => {
  return axios.post(`${URL}/image/chat/${chatidx}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* 유저가 읽지 않은 채팅의 개수를 가져오는 api */
/* target: 상대방 아이디 */
export const getUnreadMessageCount = (target) => {
  const userId = getUserId();
  return axios.post(`${URL}/chat/count`, {
    target,
    userId
  });
}