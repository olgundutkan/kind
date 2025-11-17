import TabPanel from '@components/tab-panel'
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import ItemOverviewTab from './tabs/overview'

const ItemShowPage = () => {
  const { id } = useParams()

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: <ItemOverviewTab id={id} />,
    },
  ]

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Item #{id}
      </Typography>
      <TabPanel tabs={tabs} defaultTab="overview" />
    </Box>
  )
}

export default ItemShowPage
