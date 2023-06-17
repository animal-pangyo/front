import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'

/* 리액트 쿼리 생성 */
const queryClient = new QueryClient()

/* id가 root인 태그에 렌더링 */
ReactDOM.createRoot(document.getElementById('root')).render(
  /* 리코일 등록 */
  <RecoilRoot>
    {/* 리액트 쿼리 등록 */}
    <QueryClientProvider client={queryClient}>
      {/* App 컴포넌트 렌더링 */}
      <App />
    </QueryClientProvider>
  </RecoilRoot>
)
