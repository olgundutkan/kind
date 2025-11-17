import { Breadcrumbs, Link, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const AppBreadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname
    .replace(/\/idp-frontend/, '')
    .split('/')
    .filter(Boolean)

  const items = [
    { label: 'Home', to: '/' },
    ...pathnames.map((segment, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`
      return { label: segment, to }
    }),
  ]

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return isLast ? (
          <Typography color="text.primary" key={item.to}>
            {item.label}
          </Typography>
        ) : (
          <Link component={RouterLink} underline="hover" to={item.to} key={item.to}>
            {item.label}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}

export default AppBreadcrumbs
