import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import TabPanel from '@components/tab-panel'
import RepositoryOverview from '@components/bitbucket/RepositoryOverview'
import BranchSettings from '@components/bitbucket/BranchSettings'
import {
  fetchRepositoryBranches,
  fetchRepositoryDetail,
  updateRepositoryBranchesThunk,
} from '@store/bitbucketSlice'
import { AppDispatch, RootState } from '@store'

const RepositoryShowPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { detail, detailLoading, branches, branchesLoading } = useSelector((state: RootState) => state.bitbucket)

  useEffect(() => {
    if (id) {
      dispatch(fetchRepositoryDetail(id))
      dispatch(fetchRepositoryBranches(id))
    }
  }, [dispatch, id])

  if (detailLoading || !detail) {
    return <CircularProgress />
  }

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: <RepositoryOverview repository={detail} />,
    },
    {
      id: 'branches',
      label: 'Branches',
      content: (
        <BranchSettings
          branches={branches}
          loading={branchesLoading}
          onSubmit={(updatedBranches) =>
            id && dispatch(updateRepositoryBranchesThunk({ id, payload: updatedBranches }))
          }
        />
      ),
    },
  ]

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" sx={{ mb: 2 }} spacing={2}>
        <Typography variant="h4">Repository: {detail.name}</Typography>
        <Stack direction="row" spacing={1}>
          <Button component={RouterLink} to={`/bitbucket/repositories/${id}/edit`} variant="outlined">
            Edit
          </Button>
          <Button component={RouterLink} to="/bitbucket/repositories" variant="text">
            Back to list
          </Button>
        </Stack>
      </Stack>
      <TabPanel tabs={tabs} defaultTab="overview" />
    </Box>
  )
}

export default RepositoryShowPage
