import { Children, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Login from '../../Pages/Login/Login.jsx'

const AuthWrapper = () => {
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

export default AuthWrapper
