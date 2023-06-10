import axios, { URL, getUserId } from ".";

export const fetchUsers = ({ page }) => {
  const userId = getUserId();
  return axios.get(`${URL}/admin/user-list?page=${page}`);
};

export const transformUser = (server) => {
  return {
    id: server.user_id,
    name: server.user_name,
    email: server.email,
    roles: server.roles,
    phone: server.phone,
    address: server.address,
    birth: server.birth,
  };
};
