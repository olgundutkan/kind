import { Box, Typography } from '@mui/material'

type PagePlaceholderProps = {
  title: string
  description?: string
}

const PagePlaceholder = ({ title, description }: PagePlaceholderProps) => (
  <Box>
    <Typography variant="h4" sx={{ mb: 1 }}>
      {title}
    </Typography>
    <Typography color="text.secondary">
      {description || 'This section is under construction.'}
    </Typography>
  </Box>
)

export default PagePlaceholder
