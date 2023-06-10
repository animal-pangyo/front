import { Link, NavLink } from "react-router-dom";
import styled from "./main.module.css";

const Main = () => {
  return (
    <div className={styled.main}>
      <h2>반려동물종합정보시스템</h2>
      <div className={styled.list}>
        <div>
          <NavLink to="/shop/hospital">애견병원</NavLink>
        </div>
        <div>
          <NavLink to="/shop/beauty">애견미용</NavLink>
        </div>
        <div>
          <NavLink to="/shop/cafe">애견카페</NavLink>
        </div>
        <div>
          <NavLink to="/shop/hotel">애견호텔</NavLink>
        </div>
        <div>
          <NavLink to="/shop/academy">훈련소</NavLink>
        </div>
        <div>
          <NavLink to="/shop/funeral">장례식장</NavLink>
        </div>
        <div>
          <h2>커뮤니티</h2>
          <div>
            <Link to="/notice">공지사항</Link>
            <Link to="/free">자유게시판</Link>
            <Link to="/inquiry">문의게시판</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
