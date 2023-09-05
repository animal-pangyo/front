import { Button } from "semantic-ui-react";
import TablePagination from "../paging/TablePagination";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useBoard from "../../../hooks/useBoard";
import usePagination from "../../../hooks/usePagination";
import Search from "../../common/search/search";
import useMessage from "../../../hooks/useMessage";
import BoardContext from "../context/BoardContext";
import styled from './boardlist.module.css';

/* 게시판 리스트를 보여주기 위한 함수입니다. */
/* name : 게시판의 이름을 나타냅니다. */
const BoardList = ({ name }) => {
  /* 컨텍스트 메뉴를 보여주기 위한 상태입니다. */
  const [isContext, setIsContext] = useState('');
  /* 페이지 이동을 위한 훅입니다. */
  const navigate = useNavigate();

  /* 게시판 리스트의 현재 페이지 정보에 대한 상태입니다. */
  const [page, setPage] = useState(1);

  /* 게시판을 검색 정보를 저장하기 위한 상태입니다. */
  const [searchKeyword, setSearchKeyword] = useState("");

  /* 유저와 관련 된 처리를 하기 위한 훅입니다. */
  const auth = useAuth();

  /* 게시판과 관련 된 함수를 제공하는 훅이며, id에 해당하는 게시판 데이터를 가지고 있습니다. */
  /* type : "list" 게시판리스트를 호출하기 위해 사용되는 값입니다. */
  /* value : 페이지 정보를 전달합니다. */
  /* name : 게시판의 이름을 할당합니다(자유게시판, QNA 등) */
  /* searchKeyword : 게시판을 검색 정보를 전달합니다. */
  const board = useBoard({ type: "list", value: page, name, searchKeyword });

  /* 화면 상단 메시지를 출력하기 위한 setMessage 함수 */
  const [, setMessage] = useMessage();

  /* 페이지네이션 컴포넌트를 생성하기 위한 정보를 얻어오는 데 사용하는 훅입니다. */
  /* start : 시작 페이지 번호 */
  /* end : 현재 보여질 마지막 페이지 번호 */
  /* total : 전체 게시판 수 */
  /* last : 해당 게시판의 마지막 페이지 번호 */
  /* page : 현재 페이지 */
  /* perPage : 한화면에 보여질 게시글의 수 */
  const { start, end, total, last } = usePagination({
    page,
    perPage: 10,
    total: board?.total,
  });

  /* 게시판을 삭제하는 함수입니다. */
  const deleteBoard = async (id) => {
    /* id에 대한 정보를 서버로 전송하여 해당 게시글을 삭제합니다. */
    await board.deleteBoard(id);

    /* 정상적으로 삭제 된 경우 "삭제되었습니다" 메시지를 출력합니다. */
    setMessage({
      visible: true,
      message: "삭제되었습니다.",
    });
  };

  /* 컨텍트스 메뉴를 호출하는 함수입니다. */
  const openContext = (e, author_id) => {
    e.preventDefault();
    /* isContext 상태를 true로 변경해서 컨텍스트 메뉴를 호출합니다 */
    setIsContext(author_id);
  };
  return (
    <>
      {/* 게시글을 검색하기 위한 컴포넌트입니다. */}
      {/* searchKeyword : 검색 키워드를 전달합니다. */}
      <Search searchKeyword={setSearchKeyword} />
      {/* className : className이름 설정 */}
      {/* 게시글을 table 태그를 이용하여 렌더링합니다. */}
      <table className="ui celled table boardList">
        <thead>
          <tr>
            {/* 번호 컬럼 */}
            <th>No.</th>
            {/* 작성자 컬럼 */}
            <th>글쓴이</th>
            {/* className : className이름 설정 */}
            {/* 제목 컬럼 */}
            <th className="subject">제목</th>
            {/* 등록일 컬럼 */}
            <th>등록일</th>
            {/* 기능 버튼 컬럼 */}
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          {/* 게시글이 존재하는 경우 아래를 렌더링합니다. */}
          {board?.board?.posts?.length ? (
            /* 게시글이 존재하는 만큼 반복문을 실행해서 게시글을 렌더링합니다. */
            board?.board?.posts.map((board) => (
              /* key : 각컴포넌트를 구분하기 위한 용도 */
              /* board.post_id : 게시글 아이디 */
              <tr key={board.post_id}>
                {/* data-label : 라벨 정보를 데이터로 저장 */}
                {/* board.post_id : 게시글 아이디 */}
                <td data-label="번호">{board.post_id}</td>
                {/* data-label : 라벨 정보를 데이터로 저장 */}
                {/* board.author_id : 작성자 아이디 */}
                {/* className : className이름 설정 */}
                {/* onContextMenu: 마우스 우측 클릭 시 컨텍스트 메뉴를 호출합니다. */}
                <td data-label="글쓴이" className={styled.author} onContextMenu={(e) => openContext(e, board.author_id)}>
                  {board.author_id}

                  {/* isContext가 true이면 컨텍스트 메뉴를 화면에 보여줍니다. */}
                  {/* onClose: 컨텍스트 메뉴를 종료하는 함수입니다. */}
                  {(isContext 
                    && board.author_id !== auth?.user?.id
                    && board.author_id === isContext) && <BoardContext onClose={setIsContext} id={board.author_id} />}
                </td>
                {/* className : className이름 설정 */}
                {/* data-label : 라벨 정보를 데이터로 저장 */}
                {/* width : 너비 500 */}
                <td className="subject" data-label="제목" width={500}>
                  {/* to : 이동할 페이지 */}
                  {/* board.subject : 게시글 제목 */}
                  {
                    // 관리자 또는 작성자만 QNA 상세 페이지로 이동 가능
                    (name !== "inquiry" || (auth?.user?.roles === "admin" ||
                      (auth?.user?.id ===  board?.author_id))) ? (
                        <NavLink to={`/${name}/detail/${board.post_id}`}>
                          {board.subject}
                        </NavLink>
                      ) : (
                        <>{board.subject}</>
                      )
                  }
                  
                </td>
                {/* data-label : 라벨 정보를 데이터로 저장 */}
                {/* board.created_at : 게시글 생성 날짜 */}
                <td data-label="등록일">{board.created_at}</td>
                {/* data-label : 라벨 정보를 데이터로 저장 */}
                <td data-label="기능">
                  {/* 유저가 로그인상태이면서 관리자인 경우 또는 작성자와 로그인 유저가 동일한 경우 아래를 렌더링합니다. */}
                  {(auth?.user?.roles === "admin" ||
                    (auth?.user?.id ===  board?.author_id)) && (
                    <>
                      {/* 삭제 버튼으로 게시글을 삭제합니다. */}
                      {/* onClick : 삭제 버튼 클릭 시 실행될 함수입니다. */}
                      <Button
                        onClick={() => deleteBoard(board.post_id)}
                        primary
                      >
                        삭제
                      </Button>
                      {/* 수정 버튼으로 게시글 수정 페이지로 이동합니다. */}
                      {/* onClick : 수정 버튼 클릭 시 실행될 함수입니다. */}
                      <Button
                        onClick={() =>
                          navigate(`/${name}/write/${board.post_id}`)
                        }
                        primary
                      >
                        수정
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {/* 게시글이 존재하지 않는 경우 렌더링됩니다. */}
              {/* colSpan : 컬럼 5개를 하나로 합칩니다. */}
              {/* style : 스타일을 지정합니다. */}
              <td colSpan={5} style={{ height: "150px", textAlign: "center" }}>
                존재하지 않습니다.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          {/* 페이지네이션을 렌더링하는 컴포넌트 입니다. */}
          {/* page : 현제 페이지 정보 */}
          {/* start : 시작 페이지 번호 */}
          {/* end : 현재 보여질 마지막 페이지 번호 */}
          {/* total : 전체 게시판 수 */}
          {/* last : 해당 게시판의 마지막 페이지 번호 */}
          {/* move : 페이지 번호 클릭 시 실행될 함수입니다 */}
          {/* colSpan : 컬럼을 합칠 개수를 나타냅니다. */}
          <TablePagination
            page={page}
            total={total}
            start={start}
            end={end}
            last={last}
            move={setPage}
            colSpan={5}
          />
        </tfoot>
      </table>

      <div>
        {/* 게시판이 공지사항이 아니거나, 공지사항 게시판이면서 관리자인 경우에는 글쓰기 버튼을 렌더링합니다. */}
        {name !== "notice"|| (name === "notice" && auth?.user?.id === "admin") ? (
          /* to : 이동할 페이지입니다. */
          /* color : 링크의 컬러를 변경합니다. */
          /* 링크 클릭 시 글쓰기 페이지로 이동합니다. */
          <NavLink color="#fff" to={auth?.user? `/${name}/write` : '/login'}>
            {/* className : className이름 설정 */}
            <button className="ui primary button">글쓰기</button>
          </NavLink>
        ) : null}
      </div>
    </>
  );
};

export default BoardList;
