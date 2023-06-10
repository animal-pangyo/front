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
import Review from "../pages/Review/Review";
import ReviewWrite from "../pages/Review/ReviewWrite";
import ReviewDetail from "../pages/Review/ReviewDetail";

export default [
  /* 자유게시판 */
  {
    path: "/free",
    element: (
      <AdminLayer>
        <Board />
      </AdminLayer>
    ),
  },
  {
    path: "/free/write",
    element: (
      <AdminLayer>
        <BoardWrite />
      </AdminLayer>
    ),
  },
  {
    path: "/free/write/:id",
    element: (
      <AdminLayer>
        <BoardWrite />
      </AdminLayer>
    ),
  },
  {
    path: "/free/detail/:id",
    element: (
      <AdminLayer>
        <BoardDetail />
      </AdminLayer>
    ),
  },

  /* 공지사항 */
  {
    path: "/notice",
    element: (
      <AdminLayer>
        <Notice />
      </AdminLayer>
    ),
  },
  {
    path: "/notice/write",
    element: (
      <AdminLayer>
        <NoticeWrite />
      </AdminLayer>
    ),
  },
  {
    path: "/notice/write/:id",
    element: (
      <AdminLayer>
        <NoticeWrite />
      </AdminLayer>
    ),
  },
  {
    path: "/notice/detail/:id",
    element: (
      <AdminLayer>
        <NoticeDetail />
      </AdminLayer>
    ),
  },

  /* qna */
  {
    path: "/inquiry",
    element: (
      <AdminLayer>
        <Qna />
      </AdminLayer>
    ),
  },
  {
    path: "/inquiry/write",
    element: (
      <AdminLayer>
        <QnaWrite />
      </AdminLayer>
    ),
  },
  {
    path: "/inquiry/write/:id",
    element: (
      <AdminLayer>
        <QnaWrite />
      </AdminLayer>
    ),
  },
  {
    path: "/inquiry/detail/:id",
    element: (
      <AdminLayer>
        <QnaDetail />
      </AdminLayer>
    ),
  },

  /* 리뷰 게시판 */
  {
    path: "/review/:category/write",
    element: (
      <AdminLayer>
        <ReviewWrite />
      </AdminLayer>
    ),
  },
  {
    path: "/review/:category/write/:id",
    element: (
      <AdminLayer>
        <ReviewWrite />
      </AdminLayer>
    ),
  },
  {
    path: "/review/:category/detail/:id",
    element: (
      <AdminLayer>
        <ReviewDetail />
      </AdminLayer>
    ),
  },
];
