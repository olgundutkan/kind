import TabPanel from '@components/tab-panel'
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import GatewayOverviewTab from './tabs/overview'

const GatewayShowPage = () => {
  const { id } = useParams()

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: <GatewayOverviewTab id={id} />,
    },
  ]

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Gateway #{id}
      </Typography>
      <TabPanel tabs={tabs} defaultTab="overview" />
    </Box>
  )
}

export default GatewayShowPage
