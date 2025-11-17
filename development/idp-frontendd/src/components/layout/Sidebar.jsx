import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Sidebar = ({ items, onNavigate }) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List sx={{ flexGrow: 1 }}>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <ListItemButton
              component={NavLink}
              to={item.path}
              key={item.id}
              onClick={onNavigate}
              sx={{
                '&.active': {
                  backgroundColor: 'rgba(102, 126, 234, 0.15)',
                },
              }}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={t(item.labelKey)} />
            </ListItemButton>
          )
        })}
      </List>
      <Divider />
      <Box sx={{ p: 2, fontSize: 12, color: 'text.secondary' }}>
        Local Complex Dev Setup
      </Box>
    </Box>
  )
}

export default Sidebar
