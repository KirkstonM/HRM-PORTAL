import React from 'react'
import { Box, styled } from '@mui/material'

const CustomBox = styled('Box')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '4px 0',
  marginTop: 3
})
const CustomCard = styled('Box')({
  backgroundColor: 'white',
  borderRadius: 3,
  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
  p: 3,
  mb: 3
})

export { CustomBox, CustomCard }
