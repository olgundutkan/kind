import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import RepositoryForm, { RepositoryFormValues } from '@components/bitbucket/RepositoryForm'
import { addRepositoryThunk } from '@store/bitbucketSlice'
import { AppDispatch } from '@store'

const RepositoryAddPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleSubmit = (values: RepositoryFormValues) => {
    const payload = {
      clone_url: values.clone_url,
      project: values.projectId ? { id: Number(values.projectId) } : undefined,
      type: values.typeId ? { id: Number(values.typeId), name: values.typeName } : { name: values.typeName },
      collaborator: {
        users: (values.collaboratorsUsers || '')
          .split(',')
          .filter(Boolean)
          .map((username, index) => ({ id: index + 1, username: username.trim() })),
        groups: (values.collaboratorsGroups || '')
          .split(',')
          .filter(Boolean)
          .map((name, index) => ({ id: index + 1, name: name.trim() })),
      },
    }
    dispatch(addRepositoryThunk(payload)).then(() => navigate('/bitbucket/repositories'))
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Add Existing Repository
      </Typography>
      <RepositoryForm onSubmit={handleSubmit} hideBitbucketKey hideCloneUrl={false} />
    </Box>
  )
}

export default RepositoryAddPage
