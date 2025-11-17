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
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { fetchItemsRequest } from '../store/actions/itemsActions'
import { fetchTraefikRequest } from '../store/actions/traefikActions'

const StatCard = ({ label, value, action }) => (
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

const GatewayPage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const items = useSelector((state) => state.items)
  const traefik = useSelector((state) => state.traefik)

  useEffect(() => {
    dispatch(fetchItemsRequest())
    dispatch(fetchTraefikRequest())
  }, [dispatch])

  const recentItems = items.list.slice(0, 5)
  const routerPreview = traefik.routers.slice(0, 5)

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        sx={{ mb: 3 }}
        spacing={2}
      >
        <div>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {t('navigation.gateway')}
          </Typography>
          <Typography color="text.secondary">
            Live snapshot of IDP items and Traefik routing data.
          </Typography>
        </div>
        <Stack direction="row" spacing={2}>
          <Button component={RouterLink} to="/items" variant="outlined">
            Go to Items
          </Button>
          <Button component={RouterLink} to="/traefik" variant="contained">
            Go to Traefik
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard label={t('items.title')} value={items.list.length} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            label="Traefik Routers"
            value={traefik.routers.length}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            label="Traefik Services"
            value={traefik.services.length}
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
                <Typography variant="h6">{t('navigation.items')}</Typography>
                <Button size="small" component={RouterLink} to="/items">
                  View all
                </Button>
              </Stack>
              <Divider sx={{ my: 2 }} />
              {items.loading ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : recentItems.length === 0 ? (
                <Typography color="text.secondary">
                  {t('items.empty')}
                </Typography>
              ) : (
                <List dense>
                  {recentItems.map((item) => (
                    <ListItem
                      key={item.id}
                      disableGutters
                      secondaryAction={
                        <Button
                          size="small"
                          component={RouterLink}
                          to={`/items/${item.id}`}
                        >
                          Details
                        </Button>
                      }
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={
                          item.description || `#${item.id} · Saved recently`
                        }
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
                <Typography variant="h6">Traefik Snapshot</Typography>
                <Button
                  size="small"
                  onClick={() => dispatch(fetchTraefikRequest())}
                  disabled={traefik.loading}
                >
                  Refresh
                </Button>
              </Stack>
              <Divider sx={{ my: 2 }} />
              {traefik.error && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {traefik.error}
                </Typography>
              )}
              {traefik.loading ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : routerPreview.length === 0 ? (
                <Typography color="text.secondary">
                  {t('traefik.noData')}
                </Typography>
              ) : (
                <List dense>
                  {routerPreview.map((router) => (
                    <ListItem
                      key={router.name}
                      disableGutters
                      secondaryAction={
                        <Button
                          component={RouterLink}
                          to="/traefik"
                          size="small"
                        >
                          Inspect
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

export default GatewayPage
