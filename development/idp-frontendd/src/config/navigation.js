import DashboardIcon from '@mui/icons-material/SpaceDashboard'
import InventoryIcon from '@mui/icons-material/Inventory2'
import LanIcon from '@mui/icons-material/LanOutlined'
import HubIcon from '@mui/icons-material/Hub'

const navigationConfig = [
  {
    id: 'dashboard',
    labelKey: 'navigation.dashboard',
    path: '/',
    icon: DashboardIcon,
    roles: ['admin', 'viewer', 'operator'],
  },
  {
    id: 'items',
    labelKey: 'navigation.items',
    path: '/items',
    icon: InventoryIcon,
    roles: ['admin'],
  },
  {
    id: 'traefik',
    labelKey: 'navigation.traefik',
    path: '/traefik',
    icon: LanIcon,
    roles: ['admin', 'operator'],
  },
  {
    id: 'gateway',
    labelKey: 'navigation.gateway',
    path: '/gateway',
    icon: HubIcon,
    roles: ['admin', 'operator'],
  },
]

export default navigationConfig
