import React, { useEffect } from 'react'
import LoginForm from '@Forms/LoginForm'
import { useBaseQueryQuery } from '@Redux/RTKQuery/HttpRequest.js'
import { API_ENDPOINTS } from '@Constants/Apis'
import { useDispatch } from 'react-redux'
import { loadLocale } from '@Redux/Slices/AppSlice.js'
import { Box } from '@mui/material'
import LoginIcon from '../icons/LoginIcon.svg?react'
import { Link } from 'react-router-dom'
import { LOGIN_ROUTES } from '@Constants/Routes/index.js'
import OnboardingCard from '@Components/OnboardingCard'

const LoginPage = () => {
  const dispatch = useDispatch()
  const {
    data: localeData,
    isSuccess,
    isError
  } = useBaseQueryQuery({
    endpoint: API_ENDPOINTS.LOCALE
  })

  const localizationData = localeData?.[0]?.values
  useEffect(() => {
    if (isSuccess) {
      dispatch(loadLocale(localizationData))
    }
  }, [localeData])

  //@@TODO: HANDLE THE ERROR AND REFECTCH
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <OnboardingCard logoIcon={LoginIcon} logoSize="lg" title="Welcome Back">
        <LoginForm />
      </OnboardingCard>
    </Box>
  )
}

export default LoginPage
