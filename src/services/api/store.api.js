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

export const fetchBoardList = ({ name, page: position, searchKeyword, address, level }) => {
  if (position.length) {
    return axios.get(
      `${URL}/${getContext(name)}/map?latitude=${position[0]}&longitude=${
        position[1]
      }&keyword=${name}&level=${level}`
    );
  } else if (address) {
    return axios.get(
      `${URL}/${getContext(name)}/map?address=${address}&keyword=${name}`
    );
  } else {
    return axios.get(
      `${URL}/stores/find?&word=${searchKeyword}keyword=${name}`
    );
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
    detail_address: form.address2,
    user_id,
    business_hours: form.time,
    contact: form.phone,
    address_id: ""
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
  
export const updateLike = ({ storeId, isLiked }) =>{
  const user_id = getUserId();
  return axios.post(`${URL}/stores/likes`, {
    user_id,
    storeId: storeId,
    isLike: isLiked
  });
}

export const fetchBoard = ({ id, name }) => {
  const userId = getUserId();
  const queryString = userId ? `?userId=${userId}` : '';
  return axios.get(`${URL}/${getContext(name)}/detail/${id}${queryString}`);
}

export const transformBoard = (server) => {

  return {
    ...server,
    subject: server.title,
    content: server.content,
    userId: server.user_id,
    storeInfo: server
  };
};
