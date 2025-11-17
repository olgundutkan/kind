import { Box, Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const GatewayListPage = () => (
  <Box>
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
      <Typography variant="h4">Gateway Services</Typography>
      <Button component={RouterLink} to="/gateway/create" variant="contained">
        Create
      </Button>
    </Stack>
    <Typography variant="body2">
      TODO: integrate actual gateway services table
    </Typography>
  </Box>
)

export default GatewayListPage
