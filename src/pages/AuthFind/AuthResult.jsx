import { NavLink, useParams } from "react-router-dom";
import styled from './auth-result.module.css';

/* 아이디 찾기 결과를 보여주는 페이지입니다. */
const AuthResult = () => {
  const param = useParams();
  
  return (
    <>
      {/* className : className이름 설정 */}
      <div className={styled.text}>
        <h4>고객님의 계정을 찾았습니다.</h4>
        <p>아이디 확인 후 로그인해 주세요.</p>
      </div>
      {/* className : className이름 설정 */}
      <div className={styled.result}>
        {/* param.id : 아이디 찾기를 통해 얻은 아이디 */}
        <h2>{param.id}</h2>
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

export default AuthResult;