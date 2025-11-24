import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import RepositoryForm, { RepositoryFormValues } from '@components/bitbucket/RepositoryForm'
import { AppDispatch, RootState } from '@store'
import { fetchRepositoryDetail, updateRepositoryThunk } from '@store/bitbucketSlice'

const RepositoryEditPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { detail, detailLoading } = useSelector((state: RootState) => state.bitbucket)

  useEffect(() => {
    if (id) {
      dispatch(fetchRepositoryDetail(id))
    }
  }, [dispatch, id])

  if (detailLoading || !detail) {
    return <CircularProgress />
  }

  const initialValues: RepositoryFormValues = {
    bitbucket_project_key: detail.bitbucket_project_key,
    name: detail.name,
    slug: detail.slug,
    description: detail.description,
    clone_url: detail.clone_url,
    projectId: detail.project ? String(detail.project.id) : '',
    typeId: detail.type ? String(detail.type.id) : '',
    typeName: detail.type?.name,
    collaboratorsUsers: detail.collaborator?.users?.map((u) => u.username).join(', ') || '',
    collaboratorsGroups: detail.collaborator?.groups?.map((g) => g.name).join(', ') || '',
  }

  const handleSubmit = (values: RepositoryFormValues) => {
    if (!id) return
    const payload = {
      name: values.name,
      slug: values.slug,
      description: values.description,
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
    dispatch(updateRepositoryThunk({ id, payload })).then(() => navigate(`/bitbucket/repositories/${id}`))
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Edit Repository #{id}
      </Typography>
      <RepositoryForm initialValues={initialValues} onSubmit={handleSubmit} />
    </Box>
  )
}

export default RepositoryEditPage
