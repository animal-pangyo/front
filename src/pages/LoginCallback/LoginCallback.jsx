import { useLocation } from "react-router-dom";
import { setAuthorization } from "../../services/api";
import { useQueryClient } from "react-query";
import { useEffect } from "react";

/* 사이트에 접속 후 액세스토큰이 존재하는 경우 자동로그인 처리 완료 후 서버로부터 응답받기 위한 페이지 컴포넌트입니다. */
const LoginCallback = () => {
  /* URL에서 쿼리스트링으로 전달된 데이터를 추출하기 위한 훅입니다. */
  const { search } = useLocation();
  const searchPrams = new URLSearchParams(search);

  /* 리액트 쿼리 스토어에 접근하기 위한 훅입니다. */
  const queryClient = useQueryClient();

  /* 서버로부터 토큰과 이메일 정보를 입력 받아 로컬 스토리지에 저장합니다. */
  setAuthorization(searchPrams.get('token'), searchPrams.get('email'));

  /* 키가 "user"인 데이터를 서버로부터 다시 가져오도록 요청합니다. */
  queryClient.refetchQueries(['user']);

  useEffect(() => {
    /* 해당 페이지 렌더링이 완료가 된 후 메인페이지로 이동합니다. */
    window.location.href = '/'
  }, []);
  
};

export default LoginCallback;