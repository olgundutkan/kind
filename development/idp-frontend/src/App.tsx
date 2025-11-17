import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import ItemsPage from '@pages/items'
import ItemCreatePage from '@pages/items/create'
import ItemEditPage from '@pages/items/edit'
import ItemShowPage from '@pages/items/show'
import GatewayListPage from '@pages/gateway'
import GatewayCreatePage from '@pages/gateway/create'
import GatewayEditPage from '@pages/gateway/edit'
import GatewayShowPage from '@pages/gateway/show'
import DashboardPage from '@pages/dashboard'
import TraefikPage from '@pages/traefik'
import { Suspense } from 'react'
import './styles/global.scss'
import AppLayout from '@components/layout/AppLayout'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5',
    },
    secondary: {
      main: '#00a4eb',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="items" element={<ItemsPage />} />
            <Route path="items/create" element={<ItemCreatePage />} />
            <Route path="items/:id" element={<ItemShowPage />} />
            <Route path="items/:id/edit" element={<ItemEditPage />} />

            <Route path="gateway" element={<GatewayListPage />} />
            <Route path="gateway/create" element={<GatewayCreatePage />} />
            <Route path="gateway/:id" element={<GatewayShowPage />} />
            <Route path="gateway/:id/edit" element={<GatewayEditPage />} />

            <Route path="traefik" element={<TraefikPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
