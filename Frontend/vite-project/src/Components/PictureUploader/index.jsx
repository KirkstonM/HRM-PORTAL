import React, { useState } from 'react'
import { Box, Button, Avatar, Typography, IconButton } from '@mui/material'
import { useBaseMutationMutation } from '@Redux/RTKQuery/HttpRequest.js'
import { USER_ENDPOINTS } from '@Constants/Apis/index.js'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

const ProfilePictureUploader = ({ profilePicture, full_name }) => {
  const { preview, data, handleChange } = usePictureUploaderController()

  const userProfilePic = import.meta.env.VITE_API_URL + profilePicture
  return (
    <Box>
      <Avatar
        src={preview || userProfilePic || data?.imagePath}
        alt={full_name}
        sx={{
          width: 100,
          height: 100,
          objectFit: 'cover',
          position: 'relative'
        }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        id="upload-avatar"
        hidden
      />

      <label htmlFor="upload-avatar">
        <IconButton
          component="span"
          sx={{
            position: 'absolute',
            bottom: 10,
            left: 40,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            p: 0.5,
            '&:hover': {
              backgroundColor: '#f0f0f0'
            }
          }}
        >
          <PhotoCameraIcon fontSize="small" />
        </IconButton>
      </label>
    </Box>
  )
}

const usePictureUploaderController = () => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const [payload, { error, data, isSuccess, isError, isLoading }] =
    useBaseMutationMutation()

  const handleChange = async (e) => {
    const selected = e.target.files[0]
    if (!selected) return

    setFile(selected)
    setPreview(URL.createObjectURL(selected))

    const formData = new FormData()
    formData.append('profilePic', selected)

    await payload({
      endpoint: USER_ENDPOINTS.UPLOAD_IMAGE,
      method: 'POST',
      body: formData
    })
  }

  return {
    file,
    setFile,
    preview,
    setPreview,
    error,
    data,
    isSuccess,
    isError,
    isLoading,
    handleChange
  }
}

export default ProfilePictureUploader
