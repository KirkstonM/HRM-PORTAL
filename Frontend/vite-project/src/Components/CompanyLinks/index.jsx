import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'
const CompanyLinks = () => {
  return (
    <Card
      elevation={1}
      sx={{
        border: 1,
        borderColor: 'border.primary',
        borderRadius: 2,
        paddingY: 1,
        paddingX: 2,
        background: 'inherit'
        // maxHeight: '400px',
        // overflowY: 'scroll'
      }}
    >
      <Box
        sx={{
          borderBottomWidth: 1,
          borderBottomColor: 'border.primary',
          paddingY: 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <LinkOutlinedIcon sx={{ color: 'color.blue.primary' }} />
        <Typography
          sx={{
            ml: 1,
            fontWeight: 500,
            color: 'color.blue.primary'
          }}
        >
          Company Links
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography
          sx={{
            ml: 1,
            fontWeight: 500,
            color: 'color.blue.primary'
          }}
        >
          Community
        </Typography>
      </Box>
    </Card>
  )
}

export default CompanyLinks
