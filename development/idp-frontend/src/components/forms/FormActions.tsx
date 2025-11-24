import { Box, Button, ButtonProps } from '@mui/material'

type FormActionsProps = {
  submitLabel?: string
  cancelLabel?: string
  onCancel?: () => void
  submitButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
}

const FormActions = ({
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  onCancel,
  submitButtonProps,
  cancelButtonProps,
}: FormActionsProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
    {onCancel && (
      <Button variant="outlined" onClick={onCancel} {...cancelButtonProps}>
        {cancelLabel}
      </Button>
    )}
    <Button type="submit" variant="contained" {...submitButtonProps}>
      {submitLabel}
    </Button>
  </Box>
)

export default FormActions
