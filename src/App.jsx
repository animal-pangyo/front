import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayer from './components/layers/AuthLayer'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import Login from './pages/Login/Login'
import Join from './pages/Join/Join'

const queryClient = new QueryClient()

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
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
