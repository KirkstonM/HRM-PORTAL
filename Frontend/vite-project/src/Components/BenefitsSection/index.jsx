import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import React from 'react'

const BenefitsSection = () => {
  return (
    <Card sx={{ borderRadius: 4, boxShadow: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <AssignmentIcon />
            <Typography variant="h6">Benefits Overview</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Showing: <strong>Enrolled</strong>
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box textAlign="center" py={4} color="text.secondary">
          <AssignmentIcon sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="subtitle1" fontWeight={500}>
            No benefits to see here!
          </Typography>
          <Typography variant="body2">
            There are no plans that match this selected filter.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default BenefitsSection
