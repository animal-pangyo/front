import axios from "axios";

// 개발 모드 및 배포 모드 시 URL이 다른 경우 사용합니다.
export const URL = "";

/* axios 객체를 생성 시 공통적으로 사용할 설정을 저장합니다. */
/* headers : 헤더에 대한 설정을 저장합니다. */
const newAixos = axios.create({
  headers: {
    /* Content-Type : 응답시 전달받을 데이터타입을 지정하는 것으로 json 타입으로 전달받습니다. */
    "Content-Type": "application/json",
  },
});

/* 로그인 정보를 로컬스토리지에 저장합니다. */
/* token : 액세스 토큰 */
/* userId : 유저 아이디 */
export const setAuthorization = (token, userId) => {
  /* 액세스 토큰을 로컬 스토리지에 저장합니다. */
  localStorage.setItem("token", token);

  /* 유저아이디를 로컬 스토리지에 저장합니다. */
  localStorage.setItem("userid", userId);

  /* aixos의 헤더의 authorization 키에 액세스 토큰 정보를 저장합니다. */
  /* HTTP 요청 시 엑세스 토큰을 서버로 전송할때 사용합니다. */
  newAixos.defaults.headers.common["authorization"] = `bearer ${token}`;
};

/* 로컬 스토리지에 저장 된 토큰을 가져옵니다. */
export const getAuthorization = () => {
  return localStorage.getItem("token") || "";
};

/* 로컬 스토리지에 저장 된 유저 아이디를 가져옵니다. */
export const getUserId = () => {
  return localStorage.getItem("userid") || "";
};

export default newAixos;
