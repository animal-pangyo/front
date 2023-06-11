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
  return axios.get(
    `${URL}/stores/${storeId}/reviews?page=${page}`
  ); 
};

export const deleteBoard = ({ id }) =>
  axios.delete(`${URL}/stores/${id}/reviews`);

export const createBoard = ({ form }) => {
  const userId = getUserId();
  return axios.post(`${URL}/stores/review/${form.storeId}`, {
    title: form.subject,
    content: form.content,
    userId,
    storeId: form.storeId
  });
};

export const updateBoard = ({ form, storeId, reviewId }) =>{
  const userId = getUserId();
  return axios.patch(`${URL}/stores/review/${reviewId}`, {
    title: form.subject,
    content: form.content,
    userId,
    storeId: storeId
  });
}


export const fetchBoard = ({ id, storeId }) =>
  axios.get(`${URL}/stores/review/${id}`);

