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

export const fetchBoardList = ({ page, storeId }) => {
  if (position.length) {
    return axios.get(
      `${URL}/stores/${storeId}/reviews?page=${page}`
    ); 
  } else {
    return Promise.resolve({
      data: {
        posts: [],
      },
    });
  }
};

export const deleteBoard = ({ id }) =>
  axios.delete(`${URL}/stores/${id}/reviews`);

export const createBoard = ({ form }) => {
  const userId = getUserId();
  return axios.post(`${URL}/stores/${form.storeId}/reviews`, {
    title: form.subject,
    content: form.content,
    userId,
    storeId: form.storeId
  });
};

export const updateBoard = ({ form }) =>
  axios.patch(`${URL}/stores/${form.storeId}/reviews`, {
    title: form.subject,
    content: form.content,
    userId,
    storeId: form.storeId
  });

export const fetchBoard = ({ id, storeId }) =>
  axios.get(`${URL}/stores/${storeId}/reviews/${id}`);

