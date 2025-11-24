import { useMemo } from 'react'
import BaseTable, { Column } from '@components/base-table'
import { BitbucketRepository } from '@store/bitbucketSlice'
import { Button, Stack } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

type Props = {
  data: BitbucketRepository[]
}

const RepositoriesTable = ({ data }: Props) => {
  const columns: Column<BitbucketRepository>[] = useMemo(
    () => [
      { id: 'name', label: 'Name' },
      { id: 'bitbucket_project_key', label: 'Project Key' },
      {
        id: 'type',
        label: 'Type',
        render: (row) => row.type?.name || '—',
      },
      {
        id: 'actions',
        label: 'Actions',
        render: (row) => (
          <Stack direction="row" spacing={1}>
            <Button component={RouterLink} to={`/bitbucket/repositories/${row.id}`} size="small">
              Show
            </Button>
            <Button component={RouterLink} to={`/bitbucket/repositories/${row.id}/edit`} size="small">
              Edit
            </Button>
          </Stack>
        ),
      },
    ],
    [],
  )

  return <BaseTable columns={columns} data={data} getRowId={(row) => row.id} />
}

export default RepositoriesTable
