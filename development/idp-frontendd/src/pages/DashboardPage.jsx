import {
  Box,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const StatCard = ({ label, value }) => (
  <Paper
    elevation={2}
    sx={{
      p: 3,
      borderRadius: 3,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
    }}
  >
    <Typography variant="body2" sx={{ opacity: 0.8 }}>
      {label}
    </Typography>
    <Typography variant="h4" sx={{ fontWeight: 700 }}>
      {value}
    </Typography>
  </Paper>
)

const DashboardPage = () => {
  const { t } = useTranslation()
  const items = useSelector((state) => state.items.list)
  const { routers, services } = useSelector((state) => state.traefik)
  const user = useSelector((state) => state.user)

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
        {t('dashboard.welcome', { name: user.name })}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {t('dashboard.role', { role: user.role.toUpperCase() })}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            label={t('dashboard.itemsTotal')}
            value={items.length}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            label={t('dashboard.traefikRouters')}
            value={routers.length}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            label={t('dashboard.traefikServices')}
            value={services.length}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardPage
