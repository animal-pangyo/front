import styled from './auth-layer.module.css';

/* 로그인, 회원가입, 아이디찾기, 비밀번호 찾기에서 공통적으로 사용하는 레이어 컴포넌트입니다. */
/* children : 해당 레이어에 렌더링한 컴포넌트를 전달받습니다. */
/* 공통적으로 레이아웃을 설정하고 css를 설정하기 위해서 사용합니다. */
const AuthLayer = ({ children }) => (
  /* className : className이름 설정 */
  <div className={`${styled.layer} auth_layer`}>
    {/* className : className이름 설정 */}
    <div className={styled.container}>
      {/* 전달받은 자식 컴포넌트 렌더링 */}
      {children}
    </div>
  </div>
)

export default AuthLayer;