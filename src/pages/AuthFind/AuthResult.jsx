import { NavLink, useParams } from "react-router-dom";
import styled from './auth-result.module.css';

const AuthResult = () => {
  const param = useParams();
  
  return (
    <>
      <div className={styled.text}>
        <h4>고객님의 계정을 찾았습니다.</h4>
        <p>아이디 확인 후 로그인해 주세요.</p>
      </div>
      <div className={styled.result}>
        <h2>{param.id}</h2>
      </div>
      <div className={styled.button}>
        <button className="ui large primary button">
          <NavLink to="/login">로그인</NavLink>
        </button>
      </div>
    </>
  );
};

export default AuthResult;