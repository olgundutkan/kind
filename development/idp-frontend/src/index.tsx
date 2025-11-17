import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import './i18n'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element not found')
}

createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/idp-frontend">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
