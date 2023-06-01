import styled from './admin-top.module.css';

const AdminTop = () => {
  return (
    <>
      <div className={styled.top}>
        <div className={styled.left}>
          <div>서비스 소개</div>
          <div>이용약관 및 개인정보취급방침</div>
          <div>고객센터</div>
        </div>
        <div className={styled.right}>
          <div>로그인</div>
          <div>회원가입</div>
        </div>
      </div>
    </>
  )
};

export default AdminTop;