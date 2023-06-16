import axios from ".";
import { URL } from ".";

/* 액세스 토큰을 통해 인증된 유저 정보를 가져오는 서비스 */
export const getUser = () => {
  return axios.get(`${URL}/users/refresh/mine`);
};

/* form : 유저가 입력한 폼 정보를 토대로 로그인 하는 서비스 */
export const login = (form) =>
  /* user_id : 유저아이디 */
  /* pwd : 비밀번호 */
  axios.post(`${URL}/users/login`, {
    user_id: form.id,
    pwd: form.password,
  });

/* form : 유저가 입력한 폼 정보를 토대로 회원가입 하는 서비스 */
export const join = (form) =>
  /* user_id : 유저아이디 */
  /* pwd : 비밀번호 */
  /* user_name : 유저 이름 */
  /* yaer : 년도 */
  /* month : 월 */
  /* day : 일 */
  /* pwdConfirm : 비밀번호 확인 */
  /* address : 주소 */
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

/* 로그아웃 하는 서비스 */  
export const logout = () => axios.delete(`${URL}/users/session/logout`);

/* form : 유저 아이디 찾기 시 작성한 이메일을 토대로 아이디를 받아오는 서비스 */
export const findAccount = (form) =>
  axios.post(`${URL}/users/find-account`, form);

/* form : 유저 비밀번호 초기화 시 작성한 아이디와, 비밀번호를 토대로 비밀번호를 초기화 하는 서비스 */  
export const resetPassword = (form) =>
  axios.post(`${URL}/users/reset-password`, {
    /* pwd : 비밀번호 */
    /* pwdConfirm : 비밀번호 확인 */
    ...form,
    pwd: form.password,
    pwdConfirm: form.passwordChk,
  });

/* 아이디 정보를 토대로 유저를 삭제하는 서비스 */
export const deleteUser = (id) =>
  axios.delete(`${URL}/admin/delete-user/${id}`);

/* form : 유저가 입력한 정보를 토대로 유저 정보를 수정하는 서비스 */
export const updateProfile = (form) => 
  axios.patch(`${URL}/users/${form.userId}`, form);