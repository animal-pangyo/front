import axios, { URL, getUserId } from ".";

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
const user_id = getUserId();

export const fetchBoardList = ({ page, name, searchKeyword }) =>
  axios.get(
    `${URL}/${getContext(name)}/${name}?page=${page}&keyword=${searchKeyword}`
  );

export const deleteBoard = ({ id, name }) =>
  axios.delete(`${URL}/${getContext(name)}/${id}`);

export const createBoard = ({ form, name }) =>
  axios.post(`${URL}/${getContext(name)}`, {
    title: form.subject,
    content: form.content,
    user_id,
    board_type: name,
  });

export const createAnswer = ({ answer, name, postId }) => {
  const user_id = getUserId();
  return axios.post(`${URL}/comment/${postId}`, {
    content: answer,
    user_id,
  });
};

export const updateBoard = ({ form, name }) =>
  axios.patch(`${URL}/${getContext(name)}/${form.id}`, {
    title: form.subject,
    content: form.content,
  });

  export const fetchBoard = ({ id, name }) => {
    const userId = getUserId();
    const queryString = userId ? `?userId=${userId}` : '';
    return axios.get(`${URL}/${getContext(name)}/${id}${queryString}`);
  }
  
export const transformBoard = (server) => {
  return {
    ...server,
    subject: server.title,
    content: server.content,
    userId: server.author_id,
  };
};
