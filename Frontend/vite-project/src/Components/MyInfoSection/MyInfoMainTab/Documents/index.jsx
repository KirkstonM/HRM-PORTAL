import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  useTheme
} from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const DocumentsTab = () => {
  const theme = useTheme()

  return (
    <Box p={2} display="flex" flexDirection="column" gap={3}>
      {/* Folder Card */}
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 3,
          cursor: 'pointer',
          maxWidth: 300,
          transition: 'transform 0.2s',
          '&:hover': { transform: 'scale(1.02)' }
        }}
      >
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <FolderIcon color="primary" sx={{ fontSize: 50 }} />
            <Typography variant="subtitle1" fontWeight="medium">
              Employee Uploads
            </Typography>
            <Typography variant="body2" color="text.secondary">
              0 items
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Drag and Drop Upload Area */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border={`2px dashed ${theme.palette.divider}`}
        borderRadius={4}
        p={4}
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <CloudUploadIcon color="action" sx={{ fontSize: 40 }} />
        <Typography variant="body1" mt={1}>
          Drag and drop files to upload
        </Typography>
      </Box>
    </Box>
  )
}

export default DocumentsTab
