import axios, { URL, getUserId } from ".";

/* 게시판의 종류에 따라서 사용한 컨텍스트를 달리 하기 위한 함수입니다. */
const getContext = (name) => {
  switch (name) {
    case "free":
    case "notice":
    case "faq":
    case "inquiry":
      return "posts";
    default:
      return "stores";
  }
};

/* 로컬 스토리지에 저장된 유저 아이디를 가져옵니다. */
const user_id = getUserId();

/* name에 해당하는 게시판의 리스트를 가져옵니다. */
/* page : 현재 페이지 */
/* name : 게시판 이름 */
/* searchKeyword : 게시판을 검색할 키워드 */
export const fetchBoardList = ({ page, name, searchKeyword }) =>
  axios.get(
    `${URL}/${getContext(name)}/${name}?page=${page}&keyword=${searchKeyword}`
  );

/* id에 해당하는 게시글을 삭제하는 서비스 */
/* id : 게시글 아이디 */
/* name : 게시판 이름 */
export const deleteBoard = ({ id, name }) =>
  axios.delete(`${URL}/${getContext(name)}/${id}`);

/* 유저가 작성한 폼을 토대로 게시글을 생성하는 서비스 */
/* naem : 게시판 이름 */
export const createBoard = ({ form, name }) =>
axios.post(`${URL}/${getContext(name)}`, {
    /* title : 게시글 제목 */
    /* content : 게시글 내용 */
    /* user_id : 작성자 아이디 */
    /* board_type : 게시판 종류 */
    title: form.subject,
    content: form.content,
    user_id,
    board_type: name,
  });

/* 유저가 작성한 폼을 토대로 문의게시판 답변을 생성하는 서비스 */
/* answer : 답변 내용 */
/* postId : 게시글 아이디 */
export const createAnswer = ({ answer, postId }) => {
  /* 로컬 스토리지에 저장된 유저 아이디를 가져옵니다. */
  const user_id = getUserId();

  return axios.post(`${URL}/comment/${postId}`, {
    /* content : 답변 내용 */
    /* user_id : 작성자 아이디 */
    content: answer,
    user_id,
  });
};

/* 유저가 작성한 폼을 토대로 게시글을 수정하는 서비스 */
/* naem : 게시판 이름 */
export const updateBoard = ({ form, name }) =>
  axios.patch(`${URL}/${getContext(name)}/${form.id}`, {
    /* title : 게시글 제목 */
    /* content : 게시글 내용 */
    title: form.subject,
    content: form.content,
  });

/* 게시글 상세정보를 가져오는 서비스 */
/* id : 게시글 아이디 */
/* name : 게시판 이름 */
export const fetchBoard = ({ id, name }) => {
  /* 로컬 스토리지에 저장된 유저 아이디를 가져옵니다. */
  const userId = getUserId();

  /* 유저 아이디 존재유무에 따라 userId 쿼리를 생성합니다. */
  const queryString = userId ? `?userId=${userId}` : '';
  return axios.get(`${URL}/${getContext(name)}/${id}${queryString}`);
}

/* 서버로 부터 전달받은 데이터 객체의 속성을 변경합니다. */
export const transformBoard = (server) => {
  return {
    ...server,
    /* subject : 게시글 제목 */
    /* content : 게시글 내용 */
    /* userId : 작성자 아이디 */
    subject: server.title,
    content: server.content,
    userId: server.author_id,
  };
};
