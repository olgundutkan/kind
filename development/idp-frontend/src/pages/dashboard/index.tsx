import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { fetchItems } from '@store/itemsSlice'
import { fetchTraefik } from '@store/traefikSlice'
import { AppDispatch, RootState } from '@store'

const StatCard = ({
  label,
  value,
  action,
}: {
  label: string
  value: number
  action?: React.ReactNode
}) => (
  <Card sx={{ borderRadius: 3 }}>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <div>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </div>
        {action}
      </Stack>
    </CardContent>
  </Card>
)

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()
  const items = useSelector((state: RootState) => state.items)
  const traefik = useSelector((state: RootState) => state.traefik)

  useEffect(() => {
    dispatch(fetchItems())
    dispatch(fetchTraefik())
  }, [dispatch])

  const latestItems = items.data.slice(0, 5)
  const recentRouters = traefik.routers.slice(0, 5)

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {t('welcome')}!
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Monitor backend resources and gateway routing at a glance.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard
            label="Items"
            value={items.data.length}
            action={
              <Button size="small" component={RouterLink} to="/items">
                Details
              </Button>
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            label="Traefik Routers"
            value={traefik.routers.length}
            action={
              <Button size="small" component={RouterLink} to="/items">
                Inspect
              </Button>
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            label="Traefik Services"
            value={traefik.services.length}
            action={
              <Button size="small" component={RouterLink} to="/traefik">
                Inspect
              </Button>
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Recent Items</Typography>
                <Button size="small" component={RouterLink} to="/items">
                  View all
                </Button>
              </Stack>
              <Divider sx={{ my: 2 }} />
              {items.loading ? (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <CircularProgress />
                </Box>
              ) : latestItems.length === 0 ? (
                <Typography color="text.secondary">
                  No items recorded yet.
                </Typography>
              ) : (
                <List dense>
                  {latestItems.map((item) => (
                    <ListItem
                      key={item.id}
                      disableGutters
                      secondaryAction={
                        <Button
                          component={RouterLink}
                          to={`/items/${item.id}`}
                          size="small"
                        >
                          Open
                        </Button>
                      }
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={item.description || `#${item.id}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Router Activity</Typography>
                <Button
                  size="small"
                  onClick={() => dispatch(fetchTraefik())}
                  disabled={traefik.loading}
                >
                  Refresh
                </Button>
              </Stack>
              <Divider sx={{ my: 2 }} />
              {traefik.loading ? (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <CircularProgress />
                </Box>
              ) : recentRouters.length === 0 ? (
                <Typography color="text.secondary">
                  {t('traefik.noData')}
                </Typography>
              ) : (
                <List dense>
                  {recentRouters.map((router) => (
                    <ListItem
                      key={router.name}
                      disableGutters
                      secondaryAction={
                        <Button component={RouterLink} to="/traefik" size="small">
                          Details
                        </Button>
                      }
                    >
                      <ListItemText
                        primary={router.name}
                        secondary={`${router.service} · ${
                          router.entryPoints?.join(', ') || 'N/A'
                        }`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardPage
