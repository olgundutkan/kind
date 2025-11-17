import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getItemRequest, patchItemRequest } from '@api/items'

const ItemEditPage = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError('')
    getItemRequest(id)
      .then((response) => {
        setName(response.data.name || '')
        setDescription(response.data.description || '')
      })
      .catch(() => setError('Unable to load item details.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!id) return
    setSaving(true)
    setError('')
    patchItemRequest(id, { name, description })
      .then(() => alert('Item updated successfully.'))
      .catch(() => setError('Failed to update item.'))
      .finally(() => setSaving(false))
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 480 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Edit Item #{id}
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Stack spacing={2}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading || saving}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          minRows={3}
          disabled={loading || saving}
        />
        <Button type="submit" variant="contained" disabled={loading || saving}>
          {saving ? <CircularProgress size={20} color="inherit" /> : 'Update'}
        </Button>
      </Stack>
      {loading && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}

export default ItemEditPage
