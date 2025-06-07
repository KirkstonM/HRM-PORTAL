import React, { Suspense } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useSelector } from 'react-redux'
import { createTheme } from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'
import {
  ADMIN_BASE_ROUTES,
  ONBOARDING_ROUTES,
  USER_BASE_ROUTES
} from '@App/Routing.js'
import AuthWrapper from '@Components/AuthWrapper'
import { blue, grey } from '@mui/material/colors'

function App() {
  const defaultTheme = useSelector((state) => state.app.theme)
  const darkTheme = createTheme({
    palette: {
      mode: defaultTheme,
      background: {
        default: defaultTheme === 'dark' ? '#061621' : '#f7f9fc'
      },
      border: {
        primary: defaultTheme === 'dark' ? grey[700] : grey[300]
      },
      color: {
        blue: {
          primary: blue[900]
        },
        grey: {
          primary: grey[600]
        }
      }
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
              {USER_BASE_ROUTES.map(({ Component, Path }, index) => (
                <Route key={index} element={<Component />} path={Path} exact />
              ))}
            </Route>
            <Route element={<AuthWrapper />}>
              {ADMIN_BASE_ROUTES.map(({ Component, Path }, index) => (
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
