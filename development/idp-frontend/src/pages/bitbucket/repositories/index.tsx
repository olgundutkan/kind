import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import RepositoriesTable from '@components/bitbucket/RepositoriesTable'
import { fetchRepositories } from '@store/bitbucketSlice'
import { AppDispatch, RootState } from '@store'

const BitbucketRepositoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { list, listLoading } = useSelector((state: RootState) => state.bitbucket)

  useEffect(() => {
    dispatch(fetchRepositories())
  }, [dispatch])

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" sx={{ mb: 3 }} spacing={2}>
        <div>
          <Typography variant="h4">Bitbucket Repositories</Typography>
          <Typography color="text.secondary">Manage portal içerisindeki tüm repos.</Typography>
        </div>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <Button component={RouterLink} to="/bitbucket/repositories/add" variant="outlined">
            Add Existing Repo
          </Button>
          <Button component={RouterLink} to="/bitbucket/repositories/create" variant="contained">
            Create Repository
          </Button>
        </Stack>
      </Stack>
      {listLoading ? <CircularProgress /> : <RepositoriesTable data={list} />}
    </Box>
  )
}

export default BitbucketRepositoriesPage
