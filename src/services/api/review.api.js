import axios, { URL, getUserId } from ".";

/* name에 해당하는 게시판의 리스트를 가져옵니다. */
/* page : 현재 페이지 */
/* storeId : 업체 아이디 */
export const fetchBoardList = ({ page, storeId }) => {
  /* 업체 아이디가 존재하지 않는 경우 잘못된 요청이기 떄문에 종료합니다. */
  if (!storeId) return { data: {} };

  return axios.get(
    `${URL}/stores/${storeId}/reviews?page=${page}`
  ); 
};

/* id에 해당하는 게시글을 삭제하는 서비스 */
/* id : 게시글 아이디 */
/* name : 게시판 이름 */
export const deleteBoard = ({ id }) =>
  axios.delete(`${URL}/stores/review/${id}`);

/* 유저가 작성한 폼을 토대로 게시글을 생성하는 서비스 */
export const createBoard = ({ form }) => {
  /* 로컬 스토리지에 저장된 유저 아이디를 가져옵니다. */
  const userId = getUserId();
  return axios.post(`${URL}/stores/review/${form.storeId}`, {
    /* title : 게시글 제목 */
    /* content : 게시글 내용 */
    /* user_id : 작성자 아이디 */
    /* storeId : 업체 아이디 */
    title: form.subject,
    content: form.content,
    userId,
    storeId: form.storeId
  });
};

/* 유저가 작성한 폼을 토대로 게시글을 수정하는 서비스 */
/* storeId : 업체 아이디 */
/* reviewId : 리뷰 게시글 아이디 */
export const updateBoard = ({ form, storeId, reviewId }) =>{
  /* 로컬 스토리지에 저장된 유저 아이디를 가져옵니다. */
  const userId = getUserId();
  return axios.patch(`${URL}/stores/review/${reviewId}`, {
    /* title : 게시글 제목 */
    /* content : 게시글 내용 */
    /* user_id : 작성자 아이디 */
    /* storeId : 업체 아이디 */
    title: form.subject,
    content: form.content,
    userId,
    storeId: storeId
  });
}


export const fetchBoard = ({ id, storeId }) =>
  axios.get(`${URL}/stores/review/${id}`);

