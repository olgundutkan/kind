import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  ButtonGroup,
  Button,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from './Sidebar'
import navigationConfig from '../../config/navigation'
import { useTranslation } from 'react-i18next'
import { setLanguage } from '../../store/actions/userActions'
import AppBreadcrumbs from '../navigation/AppBreadcrumbs'

const drawerWidth = 260

const Layout = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const role = useSelector((state) => state.user.role)
  const language = useSelector((state) => state.user.language)
  const [mobileOpen, setMobileOpen] = useState(false)

  const filteredNavigation = useMemo(
    () =>
      navigationConfig.filter(
        (item) => !item.roles || item.roles.includes(role),
      ),
    [role],
  )

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev)
  }

  const handleLanguageChange = (lng) => {
    dispatch(setLanguage(lng))
    i18n.changeLanguage(lng)
  }

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {t('appTitle')}
        </Typography>
      </Toolbar>
      <Divider />
      <Sidebar items={filteredNavigation} onNavigate={() => setMobileOpen(false)} />
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
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap component="div">
              {t('appTitle')}
            </Typography>
            <Typography variant="caption">
              Role: {role.toUpperCase()}
            </Typography>
          </Box>
          <ButtonGroup size="small" variant="contained">
            {['en', 'tr'].map((lng) => (
              <Button
                key={lng}
                color={language === lng ? 'secondary' : 'primary'}
                onClick={() => handleLanguageChange(lng)}
              >
                {lng.toUpperCase()}
              </Button>
            ))}
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
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
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          minHeight: '100vh',
          backgroundColor: '#f7f9fc',
        }}
      >
        <AppBreadcrumbs />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
