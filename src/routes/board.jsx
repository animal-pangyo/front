import AdminLayer from '../components/layers/AdminLayer/AdminLayer'
import Board from '../pages/Board/Board'
import BoardWrite from '../pages/Board/BoardWrite'
import BoardDetail from '../pages/Board/BoardDetail'
import Notice from '../pages/Notice/Notice'
import NoticeWrite from '../pages/Notice/NoticeWrite'
import NoticeDetail from '../pages/Notice/NoticeDetail'
import Qna from '../pages/Qna/Qna'
import QnaWrite from '../pages/Qna/QnaWrite'
import QnaDetail from '../pages/Qna/QnaDetail'

export default [
  /* 자유게시판 */
  {
    path: "/board",
    element: <AdminLayer><Board /></AdminLayer>
  },
  {
    path: "/board/write",
    element: <AdminLayer><BoardWrite /></AdminLayer>
  },
  {
    path: "/board/write/:id",
    element: <AdminLayer><BoardWrite /></AdminLayer>
  },
  {
    path: "/board/detail/:id",
    element: <AdminLayer><BoardDetail /></AdminLayer>
  },

  /* 공지사항 */
  {
    path: "/notice",
    element: <AdminLayer><Notice /></AdminLayer>
  },
  {
    path: "/notice/write",
    element: <AdminLayer><NoticeWrite /></AdminLayer>
  },
  {
    path: "/notice/write/:id",
    element: <AdminLayer><NoticeWrite /></AdminLayer>
  },
  {
    path: "/notice/detail/:id",
    element: <AdminLayer><NoticeDetail /></AdminLayer>
  },

  /* qna */
  {
    path: "/qna",
    element: <AdminLayer><Qna /></AdminLayer>
  },
  {
    path: "/qna/write",
    element: <AdminLayer><QnaWrite /></AdminLayer>
  },
  {
    path: "/qna/write/:id",
    element: <AdminLayer><QnaWrite /></AdminLayer>
  },
  {
    path: "/qna/detail/:id",
    element: <AdminLayer><QnaDetail /></AdminLayer>
  },
]