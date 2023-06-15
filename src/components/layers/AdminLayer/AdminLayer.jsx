import AdminNav from '../../common/admin/nav/AdminNav';
import AdminTop from '../../common/admin/top/AdminTop';
import styled from './admin-layer.module.css';

/* 로그인, 회원가입, 아이디찾기, 비밀번호 찾기 페이지를 제외한 공통적으로 사용하는 레이어 컴포넌트입니다. */
/* children : 해당 레이어에 렌더링한 컴포넌트를 전달받습니다. */
const AuthLayer = ({ children }) => (
  /* className : className이름 설정 */
  <div className={styled.layer}>
    {/* 좌측 네비게이션 컴포넌트 렌더링 */}
    <AdminNav />
    {/* className : className이름 설정 */}
    <div className={styled.right}>
      {/* 상단 유저관련 컴포넌트 렌더링 */}
      <AdminTop />
      {/* className : className이름 설정 */}
      <main className={styled.content}>
        {/* 전달받은 자식 컴포넌트 렌더링 */}
        { children }
      </main>
    </div>
  </div>
)

export default AuthLayer;