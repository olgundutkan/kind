import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/SpaceDashboard'
import InventoryIcon from '@mui/icons-material/Inventory2'
import LanIcon from '@mui/icons-material/LanOutlined'
import HubIcon from '@mui/icons-material/Hub'
import FolderIcon from '@mui/icons-material/Folder'
import StorageIcon from '@mui/icons-material/Storage'
import LayersIcon from '@mui/icons-material/Layers'
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent'
import CategoryIcon from '@mui/icons-material/Category'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import SourceIcon from '@mui/icons-material/Source'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import { useState } from 'react'
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom'
import AppBreadcrumbs from '@components/navigation/AppBreadcrumbs'

const expandedWidth = 240
const collapsedWidth = 72

type NavGroup =
  | {
      type: 'item'
      label: string
      path: string
      icon: typeof DashboardIcon
    }
  | {
      type: 'section'
      label: string
      items: Array<{ label: string; path: string; icon: typeof DashboardIcon }>
    }

const navStructure: NavGroup[] = [
  { type: 'item', label: 'Dashboard', path: '/', icon: DashboardIcon },
  { type: 'item', label: 'Projects', path: '/projects', icon: FolderIcon },
  { type: 'item', label: 'Gateway', path: '/gateway', icon: HubIcon },
  { type: 'item', label: 'Traefik', path: '/traefik', icon: LanIcon },
  {
    type: 'section',
    label: 'Bitbucket',
    items: [{ label: 'Repositories', path: '/bitbucket/repositories', icon: SourceIcon }],
  },
  {
    type: 'section',
    label: 'Develop',
    items: [
      { label: 'Services', path: '/develop/services', icon: SettingsInputComponentIcon },
      { label: 'Libraries', path: '/develop/libraries', icon: LayersIcon },
    ],
  },
  {
    type: 'section',
    label: 'Deploy',
    items: [
      { label: 'Deployments', path: '/deploy/deployments', icon: PrecisionManufacturingIcon },
      { label: 'Environments', path: '/deploy/environments', icon: InventoryIcon },
    ],
  },
  {
    type: 'section',
    label: 'Catalog',
    items: [
      { label: 'Templates', path: '/catalog/templates', icon: ArchitectureIcon },
      { label: 'Shared Service', path: '/catalog/shared-services', icon: StorageIcon },
    ],
  },
  {
    type: 'section',
    label: 'Management',
    items: [
      { label: 'Integrations', path: '/management/integrations', icon: IntegrationInstructionsIcon },
      { label: 'Blueprints', path: '/management/blueprints', icon: DesignServicesIcon },
    ],
  },
]

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const drawerWidth = collapsed ? collapsedWidth : expandedWidth

  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title={collapsed ? 'Expand menu' : 'Collapse menu'}>
          <Avatar
            component={RouterLink}
            to="/"
            onClick={(event) => {
              event.preventDefault()
              setCollapsed((prev) => !prev)
            }}
            sx={{
              bgcolor: 'primary.main',
              width: 40,
              height: 40,
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            O
          </Avatar>
        </Tooltip>
        {!collapsed && (
          <Box>
            <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
              IDP Portal
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Internal Developer Platform
            </Typography>
          </Box>
        )}
      </Toolbar>
      <Divider />
      <List>
        {navStructure.map((entry, index) => {
          if (entry.type === 'item') {
            const Icon = entry.icon
            const active = location.pathname === entry.path
            const item = (
              <ListItemButton
                key={entry.path}
                component={RouterLink}
                to={entry.path}
                selected={active}
                onClick={() => setMobileOpen(false)}
                sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
              >
                <ListItemIcon sx={{ minWidth: collapsed ? 0 : 32, justifyContent: 'center' }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                {!collapsed && <ListItemText primary={entry.label} />}
              </ListItemButton>
            )
            return collapsed ? (
              <Tooltip key={entry.path} title={entry.label} placement="right">
                {item}
              </Tooltip>
            ) : (
              item
            )
          }

          return (
            <Box key={`${entry.label}-${index}`} sx={{ mt: 2 }}>
              <Divider />
              {!collapsed && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ px: 3, pt: 1, display: 'block', letterSpacing: 0.5 }}
                >
                  {entry.label.toUpperCase()}
                </Typography>
              )}
              {entry.items.map((item) => {
                const Icon = item.icon
                const active = location.pathname.startsWith(item.path)
                const child = (
                  <ListItemButton
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    selected={active}
                    sx={{
                      pl: collapsed ? 1 : 5,
                      justifyContent: collapsed ? 'center' : 'flex-start',
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <ListItemIcon sx={{ minWidth: collapsed ? 0 : 32, justifyContent: 'center' }}>
                      <Icon fontSize="small" />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary={item.label} />}
                  </ListItemButton>
                )
                return collapsed ? (
                  <Tooltip key={item.path} title={`${entry.label} / ${item.label}`} placement="right">
                    {child}
                  </Tooltip>
                ) : (
                  child
                )
              })}
            </Box>
          )
        })}
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            IDP Frontend
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: expandedWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              overflowX: 'hidden',
              transition: (theme) =>
                theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.standard,
                }),
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <AppBreadcrumbs />
        <Outlet />
      </Box>
    </Box>
  )
}

export default AppLayout
