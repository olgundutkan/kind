import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Typography, Box } from '@mui/material'
import RepositoryForm, { RepositoryFormValues } from '@components/bitbucket/RepositoryForm'
import { AppDispatch } from '@store'
import { createRepositoryThunk } from '@store/bitbucketSlice'

const RepositoryCreatePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleSubmit = (values: RepositoryFormValues) => {
    const payload = {
      bitbucket_project_key: values.bitbucket_project_key,
      name: values.name,
      slug: values.slug,
      description: values.description,
      is_main_branch_branch: values.is_main_branch_branch,
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

    dispatch(createRepositoryThunk(payload)).then(() => navigate('/bitbucket/repositories'))
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create Bitbucket Repository
      </Typography>
      <RepositoryForm onSubmit={handleSubmit} hideCloneUrl />
    </Box>
  )
}

export default RepositoryCreatePage
