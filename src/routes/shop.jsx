import Shop from "../pages/Shop/Shop";
import AdminLayer from '../components/layers/AdminLayer/AdminLayer'
import ShopWrite from "../pages/Shop/ShopWrite";
import ShopDetail from "../pages/Shop/ShopDetail";

export default [
  {
    path: "/shop/:category",
    element: <AdminLayer><Shop /></AdminLayer>,
  },
  {
    path: "/shop/:category/write",
    element: <AdminLayer><ShopWrite /></AdminLayer>
  },
  {
    path: "/shop/:category/write/:id",
    element: <AdminLayer><ShopWrite /></AdminLayer>
  },
  {
    path: "/shop/:category/detail/:id",
    element: <AdminLayer><ShopDetail /></AdminLayer>
  },
]
