import { useEffect, useState } from 'react'
import { Grid, TextField } from '@mui/material'
import FormContainer from '@components/forms/FormContainer'
import FormActions from '@components/forms/FormActions'

export type RepositoryFormValues = {
  bitbucket_project_key?: string
  name: string
  slug?: string
  description?: string
  clone_url?: string
  projectId?: string
  typeId?: string
  typeName?: string
  is_main_branch_branch?: string
  collaboratorsUsers?: string
  collaboratorsGroups?: string
}

type RepositoryFormProps = {
  initialValues?: RepositoryFormValues
  onSubmit: (values: RepositoryFormValues) => void
  submitLabel?: string
  cancelLabel?: string
  onCancel?: () => void
  loading?: boolean
  hideCloneUrl?: boolean
  hideBitbucketKey?: boolean
}

const defaultValues: RepositoryFormValues = {
  bitbucket_project_key: '',
  name: '',
  slug: '',
  description: '',
  clone_url: '',
  projectId: '',
  typeId: '',
  typeName: '',
  is_main_branch_branch: 'master',
  collaboratorsUsers: '',
  collaboratorsGroups: '',
}

const RepositoryForm = ({
  initialValues,
  onSubmit,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  onCancel,
  loading,
  hideCloneUrl,
  hideBitbucketKey,
}: RepositoryFormProps) => {
  const [values, setValues] = useState<RepositoryFormValues>(initialValues || defaultValues)

  useEffect(() => {
    setValues(initialValues || defaultValues)
  }, [initialValues])

  const handleChange = (field: keyof RepositoryFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(values)
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {!hideBitbucketKey && (
          <Grid item xs={12} md={6}>
            <TextField
              label="Bitbucket Project Key"
              value={values.bitbucket_project_key}
              onChange={handleChange('bitbucket_project_key')}
              required
            />
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <TextField label="Repository Name" value={values.name} onChange={handleChange('name')} required />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Slug" value={values.slug} onChange={handleChange('slug')} placeholder="repo-slug" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Main Branch"
            value={values.is_main_branch_branch}
            onChange={handleChange('is_main_branch_branch')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            value={values.description}
            onChange={handleChange('description')}
            multiline
            minRows={3}
          />
        </Grid>
        {!hideCloneUrl && (
          <Grid item xs={12}>
            <TextField
              label="Clone URL"
              value={values.clone_url}
              onChange={handleChange('clone_url')}
              placeholder="https://bitbucket.org/team/repo"
              required
            />
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <TextField
            label="Project ID"
            value={values.projectId}
            onChange={handleChange('projectId')}
            placeholder="1"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="Type ID" value={values.typeId} onChange={handleChange('typeId')} placeholder="1" />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Type Name"
            value={values.typeName}
            onChange={handleChange('typeName')}
            placeholder="service"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Collaborator Users"
            helperText="Virgülle ayırın (ör. user1,user2)"
            value={values.collaboratorsUsers}
            onChange={handleChange('collaboratorsUsers')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Collaborator Groups"
            helperText="Virgülle ayırın"
            value={values.collaboratorsGroups}
            onChange={handleChange('collaboratorsGroups')}
          />
        </Grid>
      </Grid>
      <FormActions
        submitLabel={submitLabel}
        cancelLabel={cancelLabel}
        onCancel={onCancel}
        submitButtonProps={{ disabled: loading }}
        cancelButtonProps={{ disabled: loading }}
      />
    </FormContainer>
  )
}

export default RepositoryForm
