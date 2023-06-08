import axios from "axios";
import { URL, getUserId } from ".";

export const getUser = () => {
  return axios.get(`${URL}/users/refresh`);
}

export const login = () => (
  axios.post(`${URL}/users/login`)
)

export const join = () => (
  axios.post(`${URL}/users/join`)
);

export const logout = () => (
  axios.get(`${URL}/users/logout`)
);

export const findAccount = (form) => (
  axios.post(`${URL}/users/find-account`, form)
)

export const resetPassword = (form) => (
  axios.post(`${URL}/users/reset-password`, form)
)

export const deleteUser = (id) => (
  axios.post(`${URL}/admin/delete-user`, {
    user_id: id
  })
)

