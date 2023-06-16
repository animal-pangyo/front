import { useForm } from "react-hook-form";
import styled from "./login.module.css";
import { Link, NavLink } from "react-router-dom";
import Google from "../../assets/google-icon.svg";
import useAuth from "../../hooks/useAuth";

/* 로그인 페이지를 렌더링합니다. */
const Login = () => {
  // register : form에 속성 등록
  // handleSubmit : form의 onSubmit이 발생했을 때 호출될 함수
  // formState : 에러상태를 확인할 수 있는 값입니다.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* 유저와 관련 된 처리를 하기 위한 훅입니다. */
  const auth = useAuth();

  /* 로그인 버튼 클릭 시 호출될 함수입니다. */
  /* data : 아이디와 비밀번호 정보가 담긴 데이터입니다. */
  const onSubmit = (data) => {
    /* 로그인 버튼 클릭 시 유저 정보를 가지고 서버로 전송하여 로그인을 시도합니다. */
    auth.login(data);
  };

  return (
    // className : className이름 설정
    <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>로그인</h2>
      {/* className : className이름 설정 */}
      <div className={styled.sns}>
        {/* 구글 로그인을 하기 위한 버튼을 렌더링합니다. */}
        <button type="button" className="ui basic large button">
          {/* href : 버튼 클릭 시 이동할 주소입니다. 구글 로그인 요청을 합니다.  */}
          <a href="/google">
            {/* 구글 로고를 렌더링하는 이미지입니다. */}
            <img src={Google} />
            구글 로그인
          </a>
        </button>
      </div>
      {/* className : className이름 설정 */}
      <div className={styled.divider}>
        {/* className : className이름 설정 */}
        <div className="ui horizontal divider">Or with id</div>
      </div>
      {/* className : className이름 설정 */}
      <div className={styled.input}>
        {/* className : className이름 설정 */}
        <div className="ui input">
          {/* 아이디 입력 용 태그 렌더링 */}
          {/* type: 텍스트 */}
          {/* placeholder : 입력 전 표시될 문자 */}
          <input
            type="text"
            placeholder="아이디"
            {...register("id", { required: true })}
          />
          {/* 에러가 존재하는 경우 에러메시지 출력 */}
          {errors.id && <span>아이디를 입력해주세요.</span>}
        </div>
      </div>
      {/* className : className이름 설정 */}
      <div className={styled.input}>
        {/* className : className이름 설정 */}
        <div className="ui input">
          {/* 비밀번호 입력 용 태그 렌더링 */}
          {/* type: 비밀번호 */}
          {/* placeholder : 입력 전 표시될 문자 */}
          <input
            type="password"
            placeholder="비밀번호"
            {...register("password", { required: true })}
          />
          {/* 에러가 존재하는 경우 에러메시지 출력 */}
          {errors.password && <span>비밀번호를 입력해주세요.</span>}
        </div>
      </div>
      {/* className : className이름 설정 */}
      <div className={styled.search}>
        {/* 아이디 찾기 버튼 입력시 아이디 찾기 페이지로 이동합니다. */}
        {/* to : 링크 클릭 시이동하고자 하는 주소입니다/  */}
        <NavLink to="/find/id">아이디 찾기</NavLink>
        {/* 비밀번호 찾기 버튼 입력시 비밀번호 찾기 페이지로 이동합니다. */}
        {/* to : 링크 클릭 시이동하고자 하는 주소입니다/  */}
        <NavLink to="/find/password">비밀번호 찾기</NavLink>
        {/* 회원가입 버튼 입력시 회원가입 페이지로 이동합니다. */}
        {/* to : 링크 클릭 시이동하고자 하는 주소입니다/  */}
        <NavLink to="/join">회원가입</NavLink>
      </div>
      {/* className : className이름 설정 */}
      <div className={styled.button}>
        {/* className : className이름 설정 */}
        {/* 로그인 버튼을 렌더링합니다. */}
        <button className="ui large primary button">로그인</button>
      </div>
    </form>
  );
};

export default Login;
