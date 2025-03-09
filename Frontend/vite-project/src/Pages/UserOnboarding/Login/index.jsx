import React, { useEffect } from 'react'
import LoginForm from '@Forms/LoginForm'
import { useBaseQueryQuery } from '@Redux/RTKQuery/HttpRequest.js'
import { API_ENDPOINTS } from '@Constants/Apis'
import { useDispatch } from 'react-redux'
import { loadLocale } from '@Redux/Slices/AppSlice.js'

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
    <>
      <LoginForm />
    </>
  )
}

export default LoginPage
