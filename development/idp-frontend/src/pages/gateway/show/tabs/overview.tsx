import { Typography } from '@mui/material'

type Props = {
  id?: string
}

const GatewayOverviewTab = ({ id }: Props) => (
  <div>
    <Typography variant="h6">Gateway Overview</Typography>
    <Typography variant="body2">
      Show connection details for gateway #{id}
    </Typography>
  </div>
)

export default GatewayOverviewTab
