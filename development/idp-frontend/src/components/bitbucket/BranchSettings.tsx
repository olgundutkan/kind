import { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
  Grid,
  Button,
} from '@mui/material'
import { Branch } from '@store/bitbucketSlice'

 type BranchSettingsProps = {
  branches: Branch[]
  loading?: boolean
  onSubmit: (branches: Branch[]) => void
}

const BranchSettings = ({ branches, loading, onSubmit }: BranchSettingsProps) => {
  const [localBranches, setLocalBranches] = useState<Branch[]>(branches)

  useEffect(() => {
    setLocalBranches(branches)
  }, [branches])

  const handleSwitch = (name: keyof Branch, index: number) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updated = [...localBranches]
    updated[index] = { ...updated[index], [name]: event.target.checked }
    setLocalBranches(updated)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(localBranches)
  }

  if (localBranches.length === 0) {
    return <Typography color="text.secondary">No branches data available.</Typography>
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {localBranches.map((branch, index) => (
          <Grid item xs={12} key={branch.name}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  {branch.name}
                </Typography>
                <FormControlLabel
                  control={<Switch checked={branch.is_auto_build_branch} onChange={handleSwitch('is_auto_build_branch', index)} />}
                  label="Auto Build"
                />
                <FormControlLabel
                  control={<Switch checked={branch.is_auto_deploy_branch} onChange={handleSwitch('is_auto_deploy_branch', index)} />}
                  label="Auto Deploy"
                />
                <FormControlLabel
                  control={<Switch checked={branch.is_main_branch} onChange={handleSwitch('is_main_branch', index)} />}
                  label="Main Branch"
                />
                <TextField
                  label="Last Commit"
                  value={branch.last_commit || ''}
                  InputProps={{ readOnly: true }}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button type="submit" variant="contained" disabled={loading}>
          Update Branch Settings
        </Button>
      </Box>
    </Box>
  )
}

export default BranchSettings
