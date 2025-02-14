import React, { Suspense } from 'react'
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material'
import { useSelector } from 'react-redux'
import { createTheme } from '@mui/material/styles'
import Navigation from './Components/Navigation/Navigation.jsx'
import { Route, Routes } from 'react-router-dom'
import { BASE_ROUTES } from './App/Routing.js'
import Grid from '@mui/material/Grid2'

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
        <Box
          sx={{
            border: '2px solid lightgreen',
            maxWidth: '90%',
            margin: 'auto',
            height: '100vh',
            mt: 5
          }}
        >
          <Grid container spacing={2}>
            <Navigation />
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
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
