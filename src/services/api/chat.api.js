import axios, { URL, getUserId } from ".";

/* 채팅 리스트를 불러오는 api */
export const chat = (target) => {
  const userid = getUserId();
  return axios.post(`${URL}/chat`, {
    userid,
    target
  });
};

/* 해당 유저가 차단되었는지 확인하는 api */
/* id: 차단하려는 유저 아이디 */
export const checkBlock = (id) => (
  axios.post(`${URL}/user/isBlock/${id}`)
);

/* 해당 유저의 차단 여부를 토글하는 api */
/* id: 차단하려는 유저 아이디 */
export const toggleBlock = (id) => (
  axios.patch(`${URL}/user/block/${id}`)
)

/* 해당 유저와의 채팅룸 삭제하는 api */
/* id: 삭제하려는 유저 아이디 */
export const deleteChat = (id) => (
  axios.delete(`${URL}/user/chat/${id}`)
)

/* 채팅에 이미지를 업로드할때 사용하는 api */
/* form: 업로드 하려는 이미지 바이너리 데이터 */
/* chatidx: 채팅룸 아이디 */
export const uploadFile = ({ form, chatidx }) => {
  return axios.post(`${URL}/image/chat/${chatidx}`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}