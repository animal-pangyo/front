import AdminLayer from '../components/layers/AdminLayer/AdminLayer'
import Board from '../pages/Board/Board'
import BoardWrite from '../pages/Board/BoardWrite'
import BoardDetail from '../pages/Board/BoardDetail'

export default [
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
]