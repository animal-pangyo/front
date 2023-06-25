import axios, { URL } from ".";

/* 댓글 리스트를 가져오는 서비스 */
/* postId : 댓글을 가져오려는 게시글 번호 */
/* page : 현재 페이지 */
export const fetchComments = ({ postId, page }) => {
  return axios.get(`${URL}/comment/${postId}?page=${page}`);
};

/* 댓글을 삭제하는 서비스를 호출합니다. */
/* commentId : 댓글 아이디 */
export const deleteComment = (commentId) => {
  return axios.delete(`${URL}/comment/${commentId}`);
};

/* 댓글을 작성하는 서비스를 호출합니다. */
/* form : 댓글 작성에 필요한 데이터를 담고있습니다. */
/* 1. postId : 댓글 작성할 게시글 아이디 */
/* 2. userId : 유저 아이디 */
/* 3. content : 내용 */
export const createComment = (form) => {
  return axios.post(`${URL}/comment/${form.postId}`, {
    user_id: form.userId,
    content: form.content
  });
}

/* 댓글을 수정하는 서비스를 호출합니다. */
/* form : 댓글 작성에 필요한 데이터를 담고있습니다. */
/* 1. commentId : 댓글 작성할 게시글 아이디 */
/* 2. userId : 유저 아이디 */
/* 3. content : 내용 */
export const updateComment = (form) => {
  return axios.patch(`${URL}/comment/${form.commentId}`, {
    user_id: form.userId,
    content: form.content
  });
}