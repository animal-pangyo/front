import { NavLink, useParams } from "react-router-dom";
import styled from './auth-result.module.css';

const AuthPassword = () => {
  const param = useParams();
  
  return (
    <>
      <div className={styled.text}>
        <h4>비밀번호가 초기화되었습니다</h4>
        <p>계정을 확인 후 로그인해 주세요.</p>
      </div>
      <div className={styled.button}>
        <button className="ui large primary button">
          <NavLink to="/login">로그인</NavLink>
        </button>
      </div>
    </>
  );
};

export default AuthPassword;