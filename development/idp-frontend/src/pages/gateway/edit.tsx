import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

const GatewayEditPage = () => {
  const { id } = useParams()
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    alert(`Update gateway ${id}`)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 480 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Edit Gateway #{id}
      </Typography>
      <Stack spacing={2}>
        <TextField label="Name" required />
        <TextField label="Target URL" required />
        <Button type="submit" variant="contained">
          Update
        </Button>
      </Stack>
    </Box>
  )
}

export default GatewayEditPage
