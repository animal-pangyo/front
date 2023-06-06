import AuthLayer from '../components/layers/AuthLayer/AuthLayer'
import AdminLayer from '../components/layers/AdminLayer/AdminLayer'
import Login from '../pages/Login/Login'
import Join from '../pages/Join/Join'
import Main from '../pages/Main/Main'
import AuthFind from '../pages/AuthFind/AuthFind'
import AuthResult from '../pages/AuthFind/AuthResult'
import AuthPassword from '../pages/AuthFind/AuthPassword';
import Users from '../pages/Users/Users';

export default [
  {
    path: "/",
    element: <AdminLayer><Main /></AdminLayer>,
  },
  {
    path: "/login",
    element: <AuthLayer><Login /></AuthLayer>
  },
  {
    path: "/join",
    element: <AuthLayer><Join /></AuthLayer>
  },
  {
    path: "/find/id",
    element: <AuthLayer><AuthFind type="id" /></AuthLayer>
  },
  {
    path: "/find/password",
    element: <AuthLayer><AuthFind type="password" /></AuthLayer>
  },
  {
    path: "/find/result/:id",
    element: <AuthLayer><AuthResult /></AuthLayer>
  },
  {
    path: "/find/reset/password",
    element: <AuthLayer><AuthPassword /></AuthLayer>
  }, 
  {
    path: "/users",
    element: <AdminLayer><Users /></AdminLayer>
  },
]