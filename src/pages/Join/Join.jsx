import { useNavigate } from "react-router-dom";
import JoinForm from "../../components/common/admin/joinForm/JoinForm";
import useAuth from '../../hooks/useAuth';

/* 회원가입 페이지를 렌더링합니다. */
const Join = () => {
  /* 유저와 관련 된 처리를 하기 위한 훅입니다. */
  const auth = useAuth();

  /* 페이지 이동을 위한 훅입니다. */
  const navigate = useNavigate();

  /* 회원가입 버튼 클릭 시 실행될 함수입니다. */
  /* data : 유저가 입력하는 폼 데이터입니다. */
  const onSubmit = async data => {
    /* 비밀번호와 비밀번호 확인입력이 일치하지 않는 경우 에러를 저장합니다. */
    if (data.password !== data.passwordChk) {
      setError('passwordChk');
      return;
    }

    /* 벨리데이션에 성공하는 경우 폼 데이터를 서버로 전송하여 유저를 생성합니다. */
    await auth.join(data);
    /* 회원가입이 정상적으로 완료된 경우 로그인 페이지로 이동합니다. */
    navigate('/login');
  };


  return (
    /* 회원가입 입력 폼 컴포넌트를 렌더링합니다. */
    /* onSubmit : 회원가입 버튼 클릭 시 호출될 함수입니다. */
    <JoinForm onSubmit={onSubmit} />
  )
};

export default Join;