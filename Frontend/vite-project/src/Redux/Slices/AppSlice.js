import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  locale: {},
  theme: 'dark',
  token: true
}

const AppSlice = createSlice({
  name: 'AppSlice',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    loadLocale: (state, action) => {
      state.locale = action.payload
    },
    toggleToken: (state) => {
      state.token = true
    }
  }
})

export const { toggleTheme, loadLocale, toggleToken } = AppSlice.actions
export default AppSlice.reducer
