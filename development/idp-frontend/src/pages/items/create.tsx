import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const ItemCreatePage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    alert(`Create item: ${name} - ${description}`)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 480 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create Item
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          minRows={3}
        />
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  )
}

export default ItemCreatePage
