import { Link, NavLink } from "react-router-dom";
import styled from "./main.module.css";

/* 각종 페이지로 이동할 수 있는 링크를 가진 페이지 컴포넌트입니다. */
const Main = () => {
  return (
    /* className : className이름 설정 */
    <div className={styled.main}>
      <h2>반려동물종합정보시스템</h2>
      {/* className : className이름 설정 */}
      <div className={`${styled.list} main_list`}>
        <div>
          {/* 아이디 찾기 버튼 입력시 아이디 찾기 페이지로 이동합니다. */}
          {/* to : 링크 클릭 시이동하고자 하는 주소입니다/  */}
          <NavLink to="/shop/hospital">애견병원</NavLink>
        </div>
        <div>
          {/* 아이디 찾기 버튼 입력시 아이디 찾기 페이지로 이동합니다. */}
          {/* to : 링크 클릭 시이동하고자 하는 주소입니다/  */}
          <NavLink to="/shop/beauty">애견미용</NavLink>
        </div>
        <div>
          {/* 아이디 찾기 버튼 입력시 아이디 찾기 페이지로 이동합니다. */}
          {/* to : 링크 클릭 시이동하고자 하는 주소입니다/  */}
          <NavLink to="/shop/cafe">애견카페</NavLink>
        </div>
        <div>
          {/* 아이디 찾기 버튼 입력시 아이디 찾기 페이지로 이동합니다. */}
          {/* to : 링크 클릭 시이동하고자 하는 주소입니다/  */}
          <NavLink to="/shop/hotel">애견호텔</NavLink>
        </div>
        <div>
          {/* 아이디 찾기 버튼 입력시 아이디 찾기 페이지로 이동합니다. */}
          {/* to : 링크 클릭 시이동하고자 하는 주소입니다/  */}
          <NavLink to="/shop/academy">훈련소</NavLink>
        </div>
        <div>
          {/* 아이디 찾기 버튼 입력시 아이디 찾기 페이지로 이동합니다. */}
          {/* to : 링크 클릭 시이동하고자 하는 주소입니다/  */}
          <NavLink to="/shop/funeral">장례식장</NavLink>
        </div>
        <div>
          <h2>커뮤니티</h2>
          <div>
            {/* 아이디 찾기 버튼 입력시 아이디 찾기 페이지로 이동합니다. */}
            {/* to : 링크 클릭 시이동하고자 하는 주소입니다/  */}
            <Link to="/notice">공지사항</Link>
            {/* 아이디 찾기 버튼 입력시 아이디 찾기 페이지로 이동합니다. */}
            {/* to : 링크 클릭 시이동하고자 하는 주소입니다/  */}
            <Link to="/free">자유게시판</Link>
            {/* 아이디 찾기 버튼 입력시 아이디 찾기 페이지로 이동합니다. */}
            {/* to : 링크 클릭 시이동하고자 하는 주소입니다/  */}
            <Link to="/inquiry">문의게시판</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
