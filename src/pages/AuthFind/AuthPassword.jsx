import { NavLink } from "react-router-dom";
import styled from './auth-result.module.css';

/* 패스워드 변경 결과를 보여주는 페이지입니다. */
const AuthPassword = () => {
  return (
    <>
      {/* className : className이름 설정 */}
      <div className={styled.text}>
        <h4>비밀번호가 초기화되었습니다</h4>
        <p>계정을 확인 후 로그인해 주세요.</p>
      </div>
      {/* className : className이름 설정 */}
      <div className={styled.button}>
        {/* className : className이름 설정 */}
        <button className="ui large primary button">
          {/* to : 이동할 페이지. 로그인 페이지로 이동 */}
          <NavLink to="/login">로그인</NavLink>
        </button>
      </div>
    </>
  );
};

export default AuthPassword;