import { Box, Button, Stack, TextField, Typography } from '@mui/material'

const GatewayCreatePage = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    alert('Create gateway')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 480 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create Gateway Service
      </Typography>
      <Stack spacing={2}>
        <TextField label="Name" required />
        <TextField label="Target URL" required />
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  )
}

export default GatewayCreatePage
