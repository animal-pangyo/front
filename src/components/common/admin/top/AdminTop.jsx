import { NavLink } from 'react-router-dom';
import styled from './admin-top.module.css';
import useAuth from '../../../../hooks/useAuth';
import JoinModal from '../../../modal/joinModal/JoinModal';
import useMessage from '../../../../hooks/useMessage';
import { useState } from 'react';


const AdminTop = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [, setMessage] = useMessage();
  const auth = useAuth();

  const onSubmit = async (data) => {
    await auth.updateProfile({
      ...data,
      userId: user.id
    });
    setOpen(false);
    setMessage({
      visible: true,
      message: '수정되었습니다.'
    });
  };

  return (
    <>
      <div className={styled.top}>
        <div className={styled.left}></div>
        <div className={styled.right}>
          {
            user ? (
              <>
                <div className={styled.user}>
                  <span onClick={() => setOpen(true)}>{user.id} 님 환영합니다.</span>
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

        <JoinModal user={user} open={open} setOpen={setOpen} onSubmit={onSubmit} />
      </div>
    </>
  )
};

export default AdminTop;