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
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/SpaceDashboard'
import InventoryIcon from '@mui/icons-material/Inventory2'
import LanIcon from '@mui/icons-material/LanOutlined'
import HubIcon from '@mui/icons-material/Hub'
import { useState } from 'react'
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom'
import AppBreadcrumbs from '@components/navigation/AppBreadcrumbs'

const drawerWidth = 240

const navLinks = [
  { label: 'Dashboard', path: '/', icon: DashboardIcon },
  { label: 'Items', path: '/items', icon: InventoryIcon },
  { label: 'Gateway', path: '/gateway', icon: HubIcon },
  { label: 'Traefik', path: '/traefik', icon: LanIcon },
]

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>IDP</Avatar>
        <Typography variant="h6">IDP Frontend</Typography>
      </Toolbar>
      <Divider />
      <List>
        {navLinks.map((link) => {
          const Icon = link.icon
          return (
            <ListItemButton
              key={link.path}
              component={RouterLink}
              to={link.path}
              selected={location.pathname === link.path}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItemButton>
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
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
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
