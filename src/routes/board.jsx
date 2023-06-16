import AdminLayer from "../components/layers/AdminLayer/AdminLayer";
import Board from "../pages/Board/Board";
import BoardWrite from "../pages/Board/BoardWrite";
import BoardDetail from "../pages/Board/BoardDetail";
import Notice from "../pages/Notice/Notice";
import NoticeWrite from "../pages/Notice/NoticeWrite";
import NoticeDetail from "../pages/Notice/NoticeDetail";
import Qna from "../pages/Qna/Qna";
import QnaWrite from "../pages/Qna/QnaWrite";
import QnaDetail from "../pages/Qna/QnaDetail";
import ReviewWrite from "../pages/Review/ReviewWrite";
import ReviewDetail from "../pages/Review/ReviewDetail";

/* 게시판과 관련 된 페이지의 경로와 페이지 컴포넌트를 설정합니다. */
export default [
  /* 자유게시판 리스트 페이지 */
  {
    path: "/free",
    element: (
      <AdminLayer>
        <Board />
      </AdminLayer>
    ),
  },
  /* 자유게시판 글쓰기 페이지 */
  {
    path: "/free/write",
    element: (
      <AdminLayer>
        <BoardWrite />
      </AdminLayer>
    ),
  },
  /* 자유게시판 수정 페이지 */
  {
    path: "/free/write/:id",
    element: (
      <AdminLayer>
        <BoardWrite />
      </AdminLayer>
    ),
  },
  /* 자유게시판 상세 페이지 */
  {
    path: "/free/detail/:id",
    element: (
      <AdminLayer>
        <BoardDetail />
      </AdminLayer>
    ),
  },

  /* 공지사항 리스트 페이지 */
  {
    path: "/notice",
    element: (
      <AdminLayer>
        <Notice />
      </AdminLayer>
    ),
  },

  /* 공지사항 글쓰기 페이지 */
  {
    path: "/notice/write",
    element: (
      <AdminLayer>
        <NoticeWrite />
      </AdminLayer>
    ),
  },

  /* 공지사항 수정 페이지 */
  {
    path: "/notice/write/:id",
    element: (
      <AdminLayer>
        <NoticeWrite />
      </AdminLayer>
    ),
  },

  /* 공지사항 상세 페이지 */
  {
    path: "/notice/detail/:id",
    element: (
      <AdminLayer>
        <NoticeDetail />
      </AdminLayer>
    ),
  },

  /* 문의게시판 리스트 페이지 */
  {
    path: "/inquiry",
    element: (
      <AdminLayer>
        <Qna />
      </AdminLayer>
    ),
  },

  /* 문의게시판 글쓰기 페이지 */
  {
    path: "/inquiry/write",
    element: (
      <AdminLayer>
        <QnaWrite />
      </AdminLayer>
    ),
  },

  /* 문의게시판 수정 페이지 */
  {
    path: "/inquiry/write/:id",
    element: (
      <AdminLayer>
        <QnaWrite />
      </AdminLayer>
    ),
  },

  /* 자유게시판 수정 페이지 */
  {
    path: "/inquiry/detail/:id",
    element: (
      <AdminLayer>
        <QnaDetail />
      </AdminLayer>
    ),
  },

  /* 리뷰게시판 글쓰기 페이지 */
  {
    path: "/review/:category/write",
    element: (
      <AdminLayer>
        <ReviewWrite />
      </AdminLayer>
    ),
  },

  /* 리뷰게시판 수정 페이지 */
  {
    path: "/review/:category/write/:id",
    element: (
      <AdminLayer>
        <ReviewWrite />
      </AdminLayer>
    ),
  },

  /* 리뷰게시판 상세 페이지 */
  {
    path: "/review/:category/detail/:id",
    element: (
      <AdminLayer>
        <ReviewDetail />
      </AdminLayer>
    ),
  },
];
