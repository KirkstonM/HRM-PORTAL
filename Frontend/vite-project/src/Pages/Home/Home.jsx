import React from 'react'
import { Box } from '@mui/material'
import PersonalInfoForm from '../../Forms/PersonalInfoForm.jsx'
import { useNavigate, useNavigation } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <Box sx={{ bgcolor: '', borderRadius: 2 }}>
      <PersonalInfoForm />
      <button
        onClick={() => navigate('/employee/432', { state: { userId: 123 } })}
      >
        Click
      </button>
    </Box>
  )
}

export default Home
