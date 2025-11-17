import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import BaseTable, { Column } from '@components/base-table'
import { fetchItems } from '@store/itemsSlice'
import { AppDispatch, RootState } from '@store'

type Item = {
  id: number
  name: string
  description?: string
}

const columns: Column<Item>[] = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  {
    id: 'actions',
    label: 'Actions',
    render: (row) => (
      <Stack direction="row" spacing={1}>
        <Button
          component={RouterLink}
          to={`/items/${row.id}`}
          size="small"
          variant="outlined"
        >
          Show
        </Button>
        <Button
          component={RouterLink}
          to={`/items/${row.id}/edit`}
          size="small"
          variant="text"
        >
          Edit
        </Button>
      </Stack>
    ),
  },
]

const ItemsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading } = useSelector((state: RootState) => state.items)

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">Items</Typography>
        <Button component={RouterLink} to="/items/create" variant="contained">
          Create
        </Button>
      </Stack>
      {loading ? (
        <CircularProgress />
      ) : (
        <BaseTable columns={columns} data={data} getRowId={(row) => row.id} />
      )}
    </Box>
  )
}

export default ItemsPage
