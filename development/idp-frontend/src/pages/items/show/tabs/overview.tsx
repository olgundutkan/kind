import { Typography } from '@mui/material'

type Props = {
  id: string | undefined
}

const ItemOverviewTab = ({ id }: Props) => {
  return (
    <div>
      <Typography variant="h6">Overview</Typography>
      <Typography variant="body2">
        Displaying overview information for item #{id}
      </Typography>
    </div>
  )
}

export default ItemOverviewTab
