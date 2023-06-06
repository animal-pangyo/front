import { Link, NavLink } from 'react-router-dom';
import styled from './main.module.css';

const Main = () => {
  return (
    <div className={styled.main}>
      <h2>반려동물종합정보시스템</h2>
      <div className={styled.list}>
        <div><NavLink to="/shop/hospital">애견병원</NavLink></div>
        <div>애견미용</div>
        <div>애견카페</div>
        <div>애견호텔</div>
        <div>훈련소</div>
        <div>장례식장</div>
        <div>
          <h2>커뮤니티</h2>
          <div>
            <Link>공지사항</Link>
            <Link>자유게시판</Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Main;