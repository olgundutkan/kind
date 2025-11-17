import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchTraefikRequest } from '../store/actions/traefikActions'

const Section = ({ title, subtitle, action, children }) => (
  <Card sx={{ borderRadius: 3 }}>
    <CardHeader
      title={title}
      subheader={subtitle}
      action={action}
      sx={{ pb: 0 }}
    />
    <CardContent>{children}</CardContent>
  </Card>
)

const TraefikPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const traefik = useSelector((state) => state.traefik)
  const [tab, setTab] = useState('routers')
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    dispatch(fetchTraefikRequest())
  }, [dispatch])

  const handleRefresh = () => {
    dispatch(fetchTraefikRequest())
  }

  const currentData = useMemo(() => {
    switch (tab) {
      case 'services':
        return traefik.services || []
      case 'middlewares':
        return traefik.middlewares || []
      case 'routers':
      default:
        return traefik.routers || []
    }
  }, [tab, traefik])

  const handleTabChange = (_event, value) => {
    setTab(value)
  }

  const handleShowDetails = (type, payload) => {
    setDetail({ type, payload })
  }

  const closeDetail = () => setDetail(null)

  const renderTableHead = () => {
    switch (tab) {
      case 'services':
        return (
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Provider</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Servers</TableCell>
            <TableCell align="right">{t('actions.showDetails')}</TableCell>
          </TableRow>
        )
      case 'middlewares':
        return (
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Provider</TableCell>
            <TableCell align="right">{t('actions.showDetails')}</TableCell>
          </TableRow>
        )
      case 'routers':
      default:
        return (
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Rule</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Entry Points</TableCell>
            <TableCell align="right">{t('actions.showDetails')}</TableCell>
          </TableRow>
        )
    }
  }

  const renderTableBody = () => {
    if (currentData.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5}>
            <Typography color="text.secondary">
              {t('traefik.noData')}
            </Typography>
          </TableCell>
        </TableRow>
      )
    }

    switch (tab) {
      case 'services':
        return currentData.map((service) => (
          <TableRow key={service.name} hover>
            <TableCell>{service.name}</TableCell>
            <TableCell>{service.provider || 'N/A'}</TableCell>
            <TableCell>{service.status || 'unknown'}</TableCell>
            <TableCell>
              {service.servers?.length
                ? service.servers.join(', ')
                : 'N/A'}
            </TableCell>
            <TableCell align="right">
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleShowDetails('services', service)}
              >
                {t('actions.showDetails')}
              </Button>
            </TableCell>
          </TableRow>
        ))
      case 'middlewares':
        return currentData.map((middleware) => (
          <TableRow key={middleware.name} hover>
            <TableCell>{middleware.name}</TableCell>
            <TableCell>{middleware.type || 'N/A'}</TableCell>
            <TableCell>{middleware.status || 'unknown'}</TableCell>
            <TableCell>{middleware.provider || 'N/A'}</TableCell>
            <TableCell align="right">
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleShowDetails('middlewares', middleware)}
              >
                {t('actions.showDetails')}
              </Button>
            </TableCell>
          </TableRow>
        ))
      case 'routers':
      default:
        return currentData.map((router) => (
          <TableRow key={router.name} hover>
            <TableCell>{router.name}</TableCell>
            <TableCell>{router.rule}</TableCell>
            <TableCell>{router.service}</TableCell>
            <TableCell>
              {router.entryPoints?.length
                ? router.entryPoints.join(', ')
                : 'N/A'}
            </TableCell>
            <TableCell align="right">
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleShowDetails('routers', router)}
              >
                {t('actions.showDetails')}
              </Button>
            </TableCell>
          </TableRow>
        ))
    }
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {t('traefik.title')}
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 3 }}>
        {t('traefik.subtitle')}
      </Typography>

      <Section
        title={t('traefik.title')}
        subtitle={
          traefik.updatedAt
            ? new Date(traefik.updatedAt).toLocaleTimeString()
            : ''
        }
        action={
          <Button
            onClick={handleRefresh}
            variant="contained"
            startIcon={<RefreshIcon />}
            disabled={traefik.loading}
          >
            {t('actions.refresh')}
          </Button>
        }
      >
        {traefik.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {traefik.error}
          </Alert>
        )}
        {traefik.loading && (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{ mt: 2 }}
          variant="scrollable"
          allowScrollButtonsMobile
        >
          <Tab
            label={`${t('traefik.routers')} (${traefik.routers.length})`}
            value="routers"
          />
          <Tab
            label={`${t('traefik.services')} (${traefik.services.length})`}
            value="services"
          />
          <Tab
            label={`${t('traefik.middlewares')} (${traefik.middlewares.length})`}
            value="middlewares"
          />
        </Tabs>
        <TableContainer component={Card} sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead>{renderTableHead()}</TableHead>
            <TableBody>{renderTableBody()}</TableBody>
          </Table>
        </TableContainer>
      </Section>
      <Dialog open={Boolean(detail)} onClose={closeDetail} maxWidth="md" fullWidth>
        <DialogTitle>
          {detail ? `${detail.payload.name} – ${detail.type}` : ''}
        </DialogTitle>
        <DialogContent dividers>
          {detail && (
            <Box
              component="pre"
              sx={{
                backgroundColor: '#0b1739',
                color: '#e5e7ff',
                p: 2,
                borderRadius: 2,
                fontSize: 13,
                whiteSpace: 'pre-wrap',
              }}
            >
              {JSON.stringify(detail.payload, null, 2)}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default TraefikPage
