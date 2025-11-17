import { Box, Button, Card, CardContent, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchTraefik } from '@store/traefikSlice'
import { AppDispatch, RootState } from '@store'

type TabKey = 'routers' | 'services' | 'middlewares'

const TraefikPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const traefik = useSelector((state: RootState) => state.traefik)
  const [tab, setTab] = useState<TabKey>('routers')

  useEffect(() => {
    dispatch(fetchTraefik())
  }, [dispatch])

  const datasets = {
    routers: traefik.routers,
    services: traefik.services,
    middlewares: traefik.middlewares,
  } as const

  const currentData = datasets[tab] || []

  const renderHead = () => {
    switch (tab) {
      case 'services':
        return (
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Provider</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Servers</TableCell>
          </TableRow>
        )
      case 'middlewares':
        return (
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        )
      case 'routers':
      default:
        return (
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Entry Points</TableCell>
          </TableRow>
        )
    }
  }

  const renderRow = (row: any) => {
    switch (tab) {
      case 'services':
        return (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.provider || 'N/A'}</TableCell>
            <TableCell>{row.status || 'unknown'}</TableCell>
            <TableCell>{row.servers?.join(', ') || 'N/A'}</TableCell>
          </TableRow>
        )
      case 'middlewares':
        return (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.type || 'N/A'}</TableCell>
            <TableCell>{row.status || 'unknown'}</TableCell>
          </TableRow>
        )
      case 'routers':
      default:
        return (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.service}</TableCell>
            <TableCell>{row.entryPoints?.join(', ') || 'N/A'}</TableCell>
          </TableRow>
        )
    }
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Traefik Overview
      </Typography>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            {(['routers', 'services', 'middlewares'] as TabKey[]).map((key) => (
              <Button
                key={key}
                variant={tab === key ? 'contained' : 'outlined'}
                onClick={() => setTab(key)}
              >
                {key}
              </Button>
            ))}
            <Button
              sx={{ marginLeft: 'auto' }}
              onClick={() => dispatch(fetchTraefik())}
              disabled={traefik.loading}
            >
              Refresh
            </Button>
          </Box>
          {traefik.loading ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : currentData.length === 0 ? (
            <Typography color="text.secondary">No data available.</Typography>
          ) : (
            <Table size="small">
              <TableHead>{renderHead()}</TableHead>
              <TableBody>{currentData.map(renderRow)}</TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default TraefikPage
