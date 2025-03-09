import React, { Suspense, useEffect } from 'react'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { createTheme } from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'
import { AUTH_BASE_ROUTES, ONBOARDING_ROUTES } from '@App/Routing.js'
import { useBaseQueryQuery } from './Redux/RTKQuery/HttpRequest.js'
import AuthWrapper from '@Components/AuthWrapper'

function App() {
  const defaultTheme = useSelector((state) => state.app.theme)
  const darkTheme = createTheme({
    palette: {
      mode: defaultTheme
    }
  })
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Suspense fallback={'Loading...'}>
          <Routes>
            {ONBOARDING_ROUTES.map(({ Component, Path }, index) => (
              <Route key={index} element={<Component />} path={Path} exact />
            ))}
            <Route element={<AuthWrapper />}>
              {AUTH_BASE_ROUTES.map(({ Component, Path }, index) => (
                <Route key={index} element={<Component />} path={Path} exact />
              ))}
            </Route>
          </Routes>
        </Suspense>
      </ThemeProvider>
    </>
  )
}

export default App
