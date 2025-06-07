import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import React from 'react'

const DependentsSection = () => {
  return (
    <Card sx={{ borderRadius: 4, mb: 4, boxShadow: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <GroupIcon />
            <Typography variant="h6">Dependents</Typography>
          </Box>
          <Button variant="outlined" size="small">
            Add Dependent
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Relationship</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>SSN</TableCell>
              <TableCell>Birth Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} align="center">
                No dependents
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default DependentsSection
