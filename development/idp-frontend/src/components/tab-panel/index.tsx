import { Box, Tabs, Tab } from '@mui/material'
import { ReactNode, SyntheticEvent, useState } from 'react'

export type TabDefinition = {
  id: string
  label: ReactNode
  content: ReactNode
}

type TabPanelProps = {
  tabs: TabDefinition[]
  defaultTab?: string
}

const TabPanel = ({ tabs, defaultTab }: TabPanelProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleChange = (_event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <Box>
      <Tabs value={activeTab} onChange={handleChange}>
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.label} value={tab.id} />
        ))}
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tabs.map((tab) =>
          tab.id === activeTab ? (
            <Box key={tab.id} role="tabpanel">
              {tab.content}
            </Box>
          ) : null,
        )}
      </Box>
    </Box>
  )
}

export default TabPanel
