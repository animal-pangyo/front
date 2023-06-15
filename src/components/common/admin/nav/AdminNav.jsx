import { NavLink } from 'react-router-dom';
import styled from './admin-nav.module.css';

/* 좌측에 네비게이션을 렌더링하기 위함 컴포넌트입니다. */
const AdminNav = () => {
  return (
    <>
      {/* className : className이름 설정 */}
      <div className={styled.menu}>
        {/* 로고 버튼 클릭시 메인페이지로 이동 */}
        {/* to : 이동할 페이지 */}
        <NavLink to="/"><div className="logo"></div></NavLink>
        {/* 홈 아이콘 클릭시 메인페이지로 이동 */}
        {/* className : className이름 설정 */}
        {/* to : 이동할 페이지 */}
        <div className={styled.home}><NavLink to="/"><i className="home icon"></i></NavLink></div>
        {/* 유저 아이콘 클릭시 유저리스트 이동 */}
        {/* className : className이름 설정 */}
        {/* to : 이동할 페이지 */}
        <div className={styled.user}><NavLink to="/users"><i className="user icon"></i></NavLink></div>
        {/* 게시판 아이콘 클릭시 게시판페이지로 이동 */}
        {/* className : className이름 설정 */}
        {/* to : 이동할 페이지 */}
        <div className={styled.board}><NavLink to="/free"><i className="file icon"></i></NavLink></div>
      </div>
    </>
  )
};

export default AdminNav;