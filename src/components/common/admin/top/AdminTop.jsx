import { NavLink } from 'react-router-dom';
import styled from './admin-top.module.css';
import useAuth from '../../../../hooks/useAuth';


const AdminTop = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <div className={styled.top}>
        <div className={styled.left}>
          <div>서비스 소개</div>
          <div>이용약관 및 개인정보취급방침</div>
          <div>고객센터</div>
        </div>
        <div className={styled.right}>
          {
            user ? (
              <>
                <div className={styled.user}>
                  <span>{user.id} 님 환영합니다.</span>
                  <div className={styled.logout} onClick={logout}>로그아웃</div>
                </div>
              </>
            ) : (
              <>
                <div><NavLink to='/login'>로그인</NavLink></div>
                <div><NavLink to='/join'>회원가입</NavLink></div>
              </>    
            )
          }
          
        </div>
      </div>
    </>
  )
};

export default AdminTop;