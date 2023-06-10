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

export const fetchBoardList = ({ name, page: position }) => {
  if (position.length) {
    return axios.get(
      `${URL}/${getContext(name)}/map?latitude=${position[0]}&longitude=${
        position[1]
      }&keyword=${name}`
    );
  } else {
    return Promise.resolve({
      data: {
        posts: [],
      },
    });
  }
};

export const deleteBoard = ({ id, name }) =>
  axios.delete(`${URL}/${getContext(name)}/${id}`);

export const createBoard = ({ form, name }) => {
  const user_id = getUserId();
  return axios.post(`${URL}/${getContext(name)}`, {
    store_type: name,
    name: form.name,
    details: form.detail,
    address: form.address1,
    detail_address: form.addressn2,
    user_id,
    business_hours: form.time,
    contact: form.phone,
  });
};

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
    content: form.conent,
  });

export const fetchBoard = ({ id, name }) =>
  axios.get(`${URL}/${getContext(name)}/${id}`);

export const transformBoard = (server) => {
  return {
    subject: server.title,
    content: server.content,
    userId: server.user_id,
  };
};
