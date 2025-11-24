import { Box, BoxProps, Stack } from '@mui/material'
import { ReactNode } from 'react'

type FormContainerProps = BoxProps & {
  children: ReactNode
}

const FormContainer = ({ children, ...props }: FormContainerProps) => (
  <Box
    component="form"
    sx={{
      width: '100%',
      '& .MuiTextField-root': { width: '100%' },
    }}
    {...props}
  >
    <Stack spacing={2}>{children}</Stack>
  </Box>
)

export default FormContainer
