import { Card, CardContent, Grid, Typography } from '@mui/material'
import { BitbucketRepository } from '@store/bitbucketSlice'

type Props = {
  repository?: BitbucketRepository
}

const InfoItem = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">{value || '—'}</Typography>
  </div>
)

const RepositoryOverview = ({ repository }: Props) => {
  if (!repository) {
    return <Typography color="text.secondary">No repository selected.</Typography>
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InfoItem label="Name" value={repository.name} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoItem label="Project" value={repository.project?.name} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoItem label="Bitbucket Key" value={repository.bitbucket_project_key} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoItem label="Clone URL" value={repository.clone_url} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoItem label="Type" value={repository.type?.name} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoItem label="Created" value={repository.created_at} />
          </Grid>
          <Grid item xs={12}>
            <InfoItem label="Description" value={repository.description} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default RepositoryOverview
