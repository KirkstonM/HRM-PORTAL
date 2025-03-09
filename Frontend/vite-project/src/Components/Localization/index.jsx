import React, { useMemo } from 'react'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const Localization = ({ variant, keyId }) => {
  const localeKeys = useSelector((state) => state.app.locale)
  const keyContent = useMemo(
    () => localeKeys?.[keyId] || keyId,
    [localeKeys, keyId]
  )

  return <Typography variant={variant}>{keyContent}</Typography>
}
export default Localization
