import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayer from './components/layers/AuthLayer/AuthLayer'
import AdminLayer from './components/layers/AdminLayer/AdminLayer'
import { QueryClient, QueryClientProvider } from 'react-query'
import Login from './pages/Login/Login'
import Join from './pages/Join/Join'
import Main from './pages/Main/Main'
import AuthFind from './pages/AuthFind/AuthFind'
import styled from './app.module.css'
import useMessage from './hooks/useMessage'
import AuthResult from './pages/AuthFind/AuthResult'
import AuthPassword from './pages/AuthFind/AuthPassword'

const queryClient = new QueryClient()

function App() {
  const [message] = useMessage();

  const router = createBrowserRouter([
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
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <div 
        className={`ui compact message yellow ${styled.message}`} 
        style={ message.visible ? { display: 'inline-block' } : { display: 'none' }}
      >
        <p>{message.message}</p>
      </div>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
