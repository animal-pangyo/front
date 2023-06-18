import axios, { URL } from ".";

/* 유저 리스트를 가져오는 서비스 */
/* page : 현재 페이지 */
export const fetchUsers = ({ page }) => {
  return axios.get(`${URL}/admin/user-list?page=${page}`);
};

/* 서버로 부터 전달받은 데이터 객체의 속성을 변경합니다. */
export const transformUser = (server) => {
  return {
    /* id : 유저 아이디 */
    /* name : 유저명 */
    /* email : 유저 이메일 */
    /* roles : 유저 권한 */
    /* phone : 유저 연락처 */
    /* address : 유저 주소 */
    /* birth : 유저 탄생일 */
    ...server,
    id: server.user_id,
    name: server.user_name,
    email: server.email,
    roles: server.roles,
    phone: server.phone,
    address: server.address1 + ' ' + server.address2,
    birth: server.year + ' ' + server.month + ' '  + server.day,
  };
};
