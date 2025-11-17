import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
  IconButton,
  CircularProgress,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  createItemRequest,
  deleteItemRequest,
  fetchItemsRequest,
} from '../store/actions/itemsActions'

const ItemsPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { list, loading, submitting, error } = useSelector(
    (state) => state.items,
  )
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    dispatch(fetchItemsRequest())
  }, [dispatch])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name.trim()) return
    dispatch(createItemRequest({ name, description }))
    setName('')
    setDescription('')
  }

  const handleDelete = (id) => {
    if (!window.confirm(t('items.confirmDelete'))) {
      return
    }
    dispatch(deleteItemRequest(id))
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {t('items.title')}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        {t('items.helper')}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label={t('actions.name')}
                  value={name}
                  disabled={submitting}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  label={t('actions.description')}
                  value={description}
                  disabled={submitting}
                  multiline
                  minRows={3}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                  variant="contained"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    t('actions.addItem')
                  )}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography variant="h6">{t('navigation.items')}</Typography>
              <Chip label={`${list.length}`} color="primary" />
            </Stack>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {loading ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : list.length === 0 ? (
              <Typography color="text.secondary">{t('items.empty')}</Typography>
            ) : (
              <Stack spacing={2}>
                {list.map((item) => (
                  <Paper
                    variant="outlined"
                    key={item.id}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description || 'N/A'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {t('items.createdAt')}:{' '}
                        {new Date(item.created_at).toLocaleString()}
                      </Typography>
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item.id)}
                      disabled={submitting}
                      aria-label={t('actions.delete')}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ItemsPage
