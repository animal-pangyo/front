import { Button } from "semantic-ui-react";
import TablePagination from "../common/paging/TablePagination";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useBoard from "../../hooks/useBoard";
import usePagination from "../../hooks/usePagination";
import { useRecoilState } from "recoil";
import { reviewWriteState } from "../../store/review";
import styled from './board.module.css'
import useMessage from "../../hooks/useMessage";

/* 리뷰 게시판 리스트를 보여주기 위한 함수입니다. */
/* name : 게시판의 이름을 나타냅니다. */
/* storeId : 업체 아이디를 전달받습니다. */
/* storeInfo : 업체에 대한 정보를 전달받습니다. */
const ReviewList = ({ name, storeId, storeInfo }) => {
  /* 페이지 이동을 위한 훅입니다. */
  const navigate = useNavigate();

  /* 게시판 리스트의 현재 페이지 정보에 대한 상태입니다. */
  const [page, setPage] = useState(1);

  /* 화면 상단 메시지를 출력하기 위한 setMessage 함수 */
  const [, setMessage] = useMessage();

  /* 유저와 관련 된 처리를 하기 위한 훅입니다. */
  const auth = useAuth();

  /* 게시판과 관련 된 함수를 제공하는 훅이며, id에 해당하는 게시판 데이터를 가지고 있습니다. */
  /* type : "list" 게시판리스트를 호출하기 위해 사용되는 값입니다. */
  /* value : 페이지 정보를 전달합니다. */
  /* name : 게시판의 이름을 할당합니다(자유게시판, QNA 등) */
  /* searchKeyword : 게시판을 검색 정보를 전달합니다. */
  const board = useBoard({ type: "list", value: page, name: "review" });

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

  /* 리뷰 작성 시 업체 아이디를 저장하기 위한 상태입니다. */
  const [_, setState] = useRecoilState(reviewWriteState);

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

  /* 리뷰 작성 페이지 이동 시 업체 정보를 저장합니다. */
  /* 리뷰 작성 페이지에서 목록 클릭 시 리스트 페이지로 이동시 사용합니다. */
  const moveWrite = () => {
    setState({
      storeId,
    });
  };

  return (
    <>
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
          {board && storeInfo?.reviews?.length ? (
            /* 게시글이 존재하는 만큼 반복문을 실행해서 게시글을 렌더링합니다. */
            storeInfo.reviews.map((board) => (
              /* key : 각컴포넌트를 구분하기 위한 용도 */
              /* board.review_id : 게시글 아이디 */
              <tr key={board.review_id}>
                {/* data-label : 라벨 정보를 데이터로 저장 */}
                {/* board.review_id : 게시글 아이디 */}
                <td data-label="번호">{board.review_id}</td>
                {/* data-label : 라벨 정보를 데이터로 저장 */}
                {/* board.user_id : 작성자 아이디 */}
                <td data-label="글쓴이">{board.user_id}</td>
                {/* className : className이름 설정 */}
                {/* data-label : 라벨 정보를 데이터로 저장 */}
                {/* width : 너비 500 */}
                <td className="subject" data-label="제목" width={500}>
                  {/* to : 이동할 페이지 */}
                  {/* board.subject : 게시글 제목 */}
                  <NavLink to={`/review/${name}/detail/${board.review_id}?storeId=${storeId}`}>
                    {board.content}
                  </NavLink>
                </td>
                {/* data-label : 라벨 정보를 데이터로 저장 */}
                {/* board.created_at : 게시글 생성 날짜 */}
                <td data-label="등록일">{board.created_at}</td>
                {/* data-label : 라벨 정보를 데이터로 저장 */}
                <td data-label="기능">
                  {/* 작성자와 로그인 유저가 동일한 경우 아래를 렌더링합니다. */}
                  {auth.user && auth.user.id === board.user_id && (
                    <>
                      {/* 삭제 버튼으로 게시글을 삭제합니다. */}
                      {/* onClick : 삭제 버튼 클릭 시 실행될 함수입니다. */}
                      <Button
                        onClick={() => deleteBoard(board.review_id)}
                        primary
                      >
                        삭제
                      </Button>
                      {/* 수정 버튼으로 게시글 수정 페이지로 이동합니다. */}
                      {/* onClick : 수정 버튼 클릭 시 실행될 함수입니다. */}
                      <Button
                        onClick={() =>
                          navigate(`/review/${name}/write/${board.review_id}?storeId=${storeId}`)
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

      {/* className : className이름 설정 */}
      <div className={styled.write_button}>
        {/* 로그인 상태인 경우 아래를 렌더링합니다. */}
        {auth?.user?.id && (
          /* color : 링크의 폰트 컬러를 설정합니다. */
          /* to : 링크 클릭 시 이동할 페이지를 설정합니다. 클릭 시 리뷰 게시글 작성 페이지로 이동합니다. */
          /* onClick : 리뷰 작성 버튼 클릭 시 호출될 함수입니다.  */
          <NavLink
            color="#fff"
            to={`/review/${name}/write?storeid=${storeId}&type=${name}`}
            onClick={moveWrite}
          >
            {/* className : className이름 설정 */}
            {/* 리뷰 작성 버튼입니다. */}
            <button className="ui primary button">리뷰 작성</button>
          </NavLink>
        )}
      </div>
    </>
  );
};

export default ReviewList;
