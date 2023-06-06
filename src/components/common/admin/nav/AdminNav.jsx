import { NavLink } from 'react-router-dom';
import styled from './admin-nav.module.css';

const AdminNav = () => {
  return (
    <>
      <div className={styled.menu}>
        <div className={styled.home}><NavLink to="/"><i className="home icon"></i></NavLink></div>
        <div className={styled.user}><NavLink to="/users"><i className="user icon"></i></NavLink></div>
        <div className={styled.board}><NavLink to="/board"><i className="file icon"></i></NavLink></div>
      </div>
    </>
  )
};

export default AdminNav;