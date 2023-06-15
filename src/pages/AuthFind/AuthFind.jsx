import { useForm } from "react-hook-form";
import styled from '../Login/login.module.css';
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import useMessage from '../../hooks/useMessage';

/* 유저 아이디 찾기 또는 비밀번호 초기화시에 사용하는 페이지 컴포넌트 입니다.  */
/* type : 아이디 찾기 또는 비밀번호 초기화를 구분하기 위한 값입니다. */
const AuthFind = ({ type }) => {
  // register : form에 속성 등록
  // handleSubmit : form의 onSubmit이 발생했을 때 호출될 함수
  // getValues : form의 속성의 값 가져오기 위한 함수
  // formState : form의 값에서 에러 발생 여부를 확인하기 위한 값
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

  /* 유저와 관련 된 처리를 하기 위한 훅입니다. */
  const auth = useAuth();

  /* 화면 상단 메시지를 출력하기 위한 setMessage 함수 */
  const [, setMessage] = useMessage();

  /* 저장 버튼 클릭 시 호출되는 함수입니다. */
  /* data : 이메일 또는 비밀번호 데이터 */
  const onSubmit = async (data) => {
    try {
      /* 타입이 패스워드 일때 비밀번호와 비밀번호 체크가 동일한지 여부 확인 */
      if (type === 'password' && data.password !== data.passwordChk) {
        /* 동일하지 않은 경우 패스워드 체크 에러 추가 */
        setError('passwordChk');
        return;
      }

      /* 타입이 패스워드인 경우 패스워드 초기화 함수를 호출합니다. */
      if (type === 'password') {
        await auth.resetPassword(getValues());
      } else {
      /* 타입이 패스워드가 아닌 경우 아이디 찾기 함수를 호출합니다. */
        await auth.findAccount(getValues());
      }
    } catch {
      /* 에러가 발생시 "계정이 존재하지 않습니다" 메시지 저장 */
      setMessage({
        visible: true,
        message: '계정이 존재하지 않습니다.'
      });
    }
  }

  return (
    /* className : className이름 설정 */
    // onSubmit : form이 제출되었을 때 실행 될 함수 할당
    <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>{type === 'id' ? '아이디 찾기' : '비밀번호 초기화'}</h2>
      {
        /* type이 비밀번호인 경우 비밀번호를 설정할 수 있는 컴포넌트 렌더링 */
        type === 'password' && (
          <>
            {/* className : className이름 설정 */}
            <div className={styled.input}>
              {/* className : className이름 설정 */}
              <div className="ui input">
                {/* 아이디 입력 용 태그 렌더링 */}
                {/* type: 텍스트 */}
                {/* placeholder : 입력 전 표시될 문자 */}
                <input type="text" placeholder="아이디" {...register("user_id", { required: true })} />
                {/* 에러가 존재하는 경우 에러메시지 출력 */}
                {errors.user_id && <span>아이디를 입력해주세요.</span>}
              </div>
            </div>
            {/* className : className이름 설정 */}
            <div className={styled.input}>
              {/* className : className이름 설정 */}
              <div className="ui input">
                {/* 비밀번호 입력 용 태그 렌더링 */}
                {/* type: 비밀번호 */}
                {/* placeholder : 입력 전 표시될 문자 */}
                <input type="password" placeholder="비밀번호" {...register("password", { required: true })} />
                {/* 에러가 존재하는 경우 에러메시지 출력 */}
                {errors.password && <span>비밀번호를 입력해주세요.</span>}
              </div>
            </div>
            {/* className : className이름 설정 */}
            <div className={styled.input}>
              {/* className : className이름 설정 */}
              <div className="ui input">
                {/* 비밀번호 확인 입력 용 태그 렌더링 */}
                {/* type: 비밀번호 */}
                {/* placeholder : 입력 전 표시될 문자 */}
                <input type="password" placeholder="비밀번호 확인" {...register("passwordChk", { required: true })} />
                {/* 에러가 존재하는 경우 에러메시지 출력 */}
                {errors.passwordChk && <span>비밀번호가 일치하지 않습니다.</span>}
              </div>
            </div>
          </> 
        )
      }

      {/* className : className이름 설정 */}
      <div className={styled.input}>
        {/* className : className이름 설정 */}
        <div className="ui input">
          {/* 이메일 입력 용 태그 렌더링 */}
          {/* type: 텍스트 */}
          {/* placeholder : 입력 전 표시될 문자 */}
          <input type="text" placeholder="이메일" {...register("email", { required: true })} />
          {/* 에러가 존재하는 경우 에러메시지 출력 */}
          {errors.email && <span>이메일을 입력해주세요.</span>}
        </div>
      </div>
      {/* className : className이름 설정 */}
      <div className={styled.button}>
        {/* className : className이름 설정 */}
        {/* 저장하기 버튼 */}
        <button className="ui large primary button">
          확인
        </button>
      </div>
      {/* className : className이름 설정 */}
      <div className={styled.search}>
        {/* to : 이동할 페이지. 로그인 페이지로 이동 */}
        <NavLink to="/login">로그인</NavLink>
        {/* to : 이동할 페이지. 회원가입 페이지로 이동 */}
        <NavLink to="/join">회원가입</NavLink>
      </div>
    </form>
  )
};

export default AuthFind;