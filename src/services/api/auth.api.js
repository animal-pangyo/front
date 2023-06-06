import axios from "axios";
import { URL } from ".";

export const getUser = () => {

};

export const login = () => (
  axios.post(`${URL}/api/login`)
)

export const join = () => (
  axios.post(`${URL}/api/join`)
);

export const logout = () => (
  axios.get(`${URL}/api/logout`)
);

export const findAccount = (form) => (
  axios.post(`${URL}/users/find-account`, form)
)

export const resetPassword = (form) => (
  axios.post(`${URL}/users/reset-password`, form)
)

export const deleteUser = (id) => (
  axios.delete(`${URL}/user/${id}`)
)

