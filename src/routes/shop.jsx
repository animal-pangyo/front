import Shop from "../pages/Shop/Shop";
import AdminLayer from '../components/layers/AdminLayer/AdminLayer'
import ShopDetail from "../pages/Shop/ShopDetail";

/* 업체와 관련 된 페이지 경로와 컴포넌트를 설정합니다. */
export default [
  /* 업체 리스트 페이지 */
  {
    path: "/shop/:category",
    element: <AdminLayer><Shop /></AdminLayer>,
  },

  /* 업체 상세 페이지 */
  {
    path: "/shop/:category/detail/:id",
    element: <AdminLayer><ShopDetail /></AdminLayer>
  },
]
