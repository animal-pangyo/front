import AuthLayer from '../components/layers/AuthLayer/AuthLayer'
import AdminLayer from '../components/layers/AdminLayer/AdminLayer'
import Login from '../pages/Login/Login'
import Join from '../pages/Join/Join'
import Main from '../pages/Main/Main'
import AuthFind from '../pages/AuthFind/AuthFind'
import AuthResult from '../pages/AuthFind/AuthResult'
import AuthPassword from '../pages/AuthFind/AuthPassword';
import Users from '../pages/Users/Users';
import LoginCallback from '../pages/LoginCallback/LoginCallback'

/* 유저와 관련 된 페이지 경로와 컴포넌트를 설정합니다. */
export default [
  /* 메인 페이지 */
  {
    path: "/",
    element: <AdminLayer><Main /></AdminLayer>,
  },
  /* 로그인 페이지 */
  {
    path: "/login",
    element: <AuthLayer><Login /></AuthLayer>
  },
  /* 회원가입 페이지 */
  {
    path: "/join",
    element: <AuthLayer><Join /></AuthLayer>
  },
  /* 아이디 찾기 페이지 */
  {
    path: "/find/id",
    element: <AuthLayer><AuthFind type="id" /></AuthLayer>
  },
  /* 패스워드 초기화 페이지 */
  {
    path: "/find/password",
    element: <AuthLayer><AuthFind type="password" /></AuthLayer>
  },
  /* 아이디 찾기 결과 페이지 */
  {
    path: "/find/result/:id",
    element: <AuthLayer><AuthResult /></AuthLayer>
  },
  /* 패스워드 초기화 결과 페이지 */
  {
    path: "/find/reset/password",
    element: <AuthLayer><AuthPassword /></AuthLayer>
  }, 
  /* 유저 리스트 페이지 */
  {
    path: "/users",
    element: <AdminLayer><Users /></AdminLayer>
  },
  /* 구글 로그인 시 서버로부터 응답받을 페이지 */
  {
    path: "/login/callback",
    element: <LoginCallback />
  }
]