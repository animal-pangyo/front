import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>
)
