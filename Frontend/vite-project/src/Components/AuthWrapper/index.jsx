import React from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { useBaseQueryQuery } from '@Redux/RTKQuery/HttpRequest.js'
import { API_ENDPOINTS } from '@Constants/Apis/index.js'

const AuthWrapper = () => {
  const { data, isLoading, isError } = useBaseQueryQuery({
    endpoint: API_ENDPOINTS.AUTH
  })

  const location = useLocation()
  const user = data?.data
  const role = user?.role
  const path = location.pathname

  const isAdminRoute = path.startsWith('/admin')
  const isUserRoute = path.startsWith('/user')

  if (isLoading) return <div>Loading...</div>
  if (isError || !user) return <Navigate to="/" replace />

  const isAuthorized =
    (isAdminRoute && role.toLowerCase() === 'admin') ||
    (isUserRoute && ['admin', 'user', 'manager'].includes(role))

  return isAuthorized ? <Outlet /> : <Navigate to="/unauthorized" replace />
}

export default AuthWrapper
