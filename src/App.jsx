import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayer from './components/layers/AuthLayer/AuthLayer'
import AdminLayer from './components/layers/AdminLayer/AdminLayer'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import Login from './pages/Login/Login'
import Join from './pages/Join/Join'
import Main from './pages/Main/Main'

const queryClient = new QueryClient()

function App() {
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
      path: "join",
      element: <AuthLayer><Join /></AuthLayer>
    }
  ])

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilRoot>
    
  )
}

export default App
