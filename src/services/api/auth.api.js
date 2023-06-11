import axios from ".";
import { URL, getUserId } from ".";

export const getUser = () => {
  return axios.get(`${URL}/users/refresh/mine`);
};

export const login = (form) =>
  axios.post(`${URL}/users/login`, {
    user_id: form.id,
    pwd: form.password,
  });

export const join = (form) =>
  axios.post(`${URL}/users/join`, {
    user_id: form.id,
    pwd: form.password,
    user_name: form.name,
    yaer: form.yaer,
    month: form.month,
    day: form.day,
    pwdConfirm: form.passwordChk,
    address: form.address1 + form.address2,
    ...form,
  });

export const logout = () => axios.delete(`${URL}/users/session/logout`);

export const findAccount = (form) =>
  axios.post(`${URL}/users/find-account`, form);

export const resetPassword = (form) =>
  axios.post(`${URL}/users/reset-password`, {
    ...form,
    pwd: form.password,
    pwdConfirm: form.passwordChk,
  });

export const deleteUser = (id) =>
  axios.delete(`${URL}/admin/delete-user/${id}`);

export const updateProfile = (form) => 
  axios.patch(`${URL}/users/${form.userId}`, form);