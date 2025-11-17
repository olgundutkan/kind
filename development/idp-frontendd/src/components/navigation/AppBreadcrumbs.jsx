import { Breadcrumbs, Link, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import navigationConfig from '../../config/navigation'

const AppBreadcrumbs = () => {
  const location = useLocation()
  const { t } = useTranslation()

  const navMap = useMemo(() => {
    const map = { '/': 'navigation.dashboard' }
    navigationConfig.forEach((item) => {
      map[item.path || '/'] = item.labelKey
    })
    return map
  }, [])

  const segments = location.pathname.split('/').filter(Boolean)
  const crumbs = []
  let currentPath = ''

  if (segments.length === 0) {
    crumbs.push({ path: '/', labelKey: navMap['/'] })
  } else {
    crumbs.push({ path: '/', labelKey: navMap['/'] })
    segments.forEach((segment) => {
      currentPath += `/${segment}`
      crumbs.push({
        path: currentPath,
        labelKey: navMap[currentPath] || segment,
      })
    })
  }

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1
        const label =
          typeof crumb.labelKey === 'string'
            ? t(crumb.labelKey, { defaultValue: crumb.labelKey })
            : crumb.labelKey

        return isLast ? (
          <Typography color="text.primary" key={crumb.path}>
            {label}
          </Typography>
        ) : (
          <Link
            key={crumb.path}
            component={RouterLink}
            to={crumb.path}
            underline="hover"
            color="inherit"
          >
            {label}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}

export default AppBreadcrumbs
