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
import BitbucketRepositoriesPage from '@pages/bitbucket/repositories'
import RepositoryCreatePage from '@pages/bitbucket/repositories/create'
import RepositoryAddPage from '@pages/bitbucket/repositories/add'
import RepositoryEditPage from '@pages/bitbucket/repositories/edit'
import RepositoryShowPage from '@pages/bitbucket/repositories/show'
import ProjectsPage from '@pages/projects'
import ServicesPage from '@pages/develop/ServicesPage'
import LibrariesPage from '@pages/develop/LibrariesPage'
import DeploymentsPage from '@pages/deploy/DeploymentsPage'
import EnvironmentsPage from '@pages/deploy/EnvironmentsPage'
import TemplatesPage from '@pages/catalog/TemplatesPage'
import SharedServicesPage from '@pages/catalog/SharedServicesPage'
import IntegrationsPage from '@pages/management/IntegrationsPage'
import BlueprintsPage from '@pages/management/BlueprintsPage'
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
  typography: {
    fontSize: 12,
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiListItemButton: {
      defaultProps: {
        dense: true,
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 32,
        },
      },
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
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="items" element={<ItemsPage />} />
            <Route path="items/create" element={<ItemCreatePage />} />
            <Route path="items/:id" element={<ItemShowPage />} />
            <Route path="items/:id/edit" element={<ItemEditPage />} />

            <Route path="gateway" element={<GatewayListPage />} />
            <Route path="gateway/create" element={<GatewayCreatePage />} />
            <Route path="gateway/:id" element={<GatewayShowPage />} />
            <Route path="gateway/:id/edit" element={<GatewayEditPage />} />

            <Route path="traefik" element={<TraefikPage />} />
            <Route path="bitbucket">
              <Route path="repositories" element={<BitbucketRepositoriesPage />} />
              <Route path="repositories/create" element={<RepositoryCreatePage />} />
              <Route path="repositories/add" element={<RepositoryAddPage />} />
              <Route path="repositories/:id" element={<RepositoryShowPage />} />
              <Route path="repositories/:id/edit" element={<RepositoryEditPage />} />
            </Route>
            <Route path="develop">
              <Route path="services" element={<ServicesPage />} />
              <Route path="libraries" element={<LibrariesPage />} />
            </Route>
            <Route path="deploy">
              <Route path="deployments" element={<DeploymentsPage />} />
              <Route path="environments" element={<EnvironmentsPage />} />
            </Route>
            <Route path="catalog">
              <Route path="templates" element={<TemplatesPage />} />
              <Route path="shared-services" element={<SharedServicesPage />} />
            </Route>
            <Route path="management">
              <Route path="integrations" element={<IntegrationsPage />} />
              <Route path="blueprints" element={<BlueprintsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
