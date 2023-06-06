import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import styled from './app.module.css'
import useMessage from './hooks/useMessage'
import routes from './routes';

const queryClient = new QueryClient()

function App() {
  const [message] = useMessage();
  const router = createBrowserRouter(routes)

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
