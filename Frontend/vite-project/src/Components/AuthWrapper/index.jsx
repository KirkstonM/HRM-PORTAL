import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useBaseQueryQuery } from '@Redux/RTKQuery/HttpRequest.js'
import { API_ENDPOINTS } from '@Constants/Apis/index.js'

const AuthWrapper = () => {
  const { data, isLoading, isError, error } = useBaseQueryQuery({
    endpoint: API_ENDPOINTS.AUTH
  })
  console.log(data)

  if (isLoading) {
    return <div>Loading...</div> // or your loading spinner
  }

  if (isError || !data?.data) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default AuthWrapper
