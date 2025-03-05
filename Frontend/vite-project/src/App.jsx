import React, { Suspense, useEffect } from 'react'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { createTheme } from '@mui/material/styles'
import SideNavigationBar from './Components/SideNavigationBar/SideNavigationBar.jsx'
import { Route, Routes } from 'react-router-dom'
import { BASE_ROUTES } from './App/Routing.js'
import AppBar from './Components/TopAppBar/TopAppBar.jsx'
import { useBaseQueryQuery } from './Redux/RTKQuery/HttpRequest.js'
import { useDispatch } from 'react-redux'
import { loadLocale } from './Redux/Slices/AppSlice.js'
import { mockEmployeeData } from './mocks/mockApiResponse.js'
import { loadEmployeeData } from './Redux/Slices/EmployeeDetailsSlice.js'
import AuthWrapper from './Components/AuthWrapper/AuthWrapper.jsx'

function App() {
  const defaultTheme = useSelector((state) => state.app.theme)
  const dispatch = useDispatch()
  const darkTheme = createTheme({
    palette: {
      mode: defaultTheme
    }
  })
  const {
    data: ResponseData,
    error,
    isLoading
  } = useBaseQueryQuery({
    endpoint: 'locale'
  })

  const data = ResponseData?.data[0]?.values

  useEffect(() => {
    dispatch(loadEmployeeData(mockEmployeeData))
    if (data) {
      dispatch(loadLocale(data))
    }
  }, [data, dispatch])
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <SideNavigationBar />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, border: '1px solid red' }}
          >
            <AppBar />
            <Suspense fallback={'Loading...'}>
              <Routes>
                {BASE_ROUTES.map(({ Component, Path }, index) => (
                  <Route
                    key={index}
                    element={<Component />}
                    path={Path}
                    exact
                  />
                ))}
              </Routes>
            </Suspense>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
