import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthWrapper = () => {
  const token = useSelector((state) => state.app.token)

  useEffect(() => {
    console.log('Refreshed....')
  }, [])

  return token ? <Outlet /> : <Navigate to={'/'} />
}

export default AuthWrapper
