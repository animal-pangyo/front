import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query'
import styled from './app.module.css'
import useMessage from './hooks/useMessage'
import routes from './routes';
import { useEffect } from 'react';
import { getAuthorization } from './services/api';



function App() {
  const [message] = useMessage();
  const router = createBrowserRouter(routes)
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = getAuthorization();

    if (token) {
      queryClient.invalidateQueries('user');
    }
  }, []);

  return (
    <>
      <div 
        className={`ui compact message yellow ${styled.message}`} 
        style={ message.visible ? { display: 'inline-block' } : { display: 'none' }}
      >
        <p>{message.message}</p>
      </div>
      <RouterProvider router={router} />
    </>
  )
}

export default App
