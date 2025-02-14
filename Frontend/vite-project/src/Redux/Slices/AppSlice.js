import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  locale: [],
  theme: 'dark'
}

const AppSlice = createSlice({
  name: 'AppSlice',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    loadLocale: (state, payload) => {
      state.locale.push(payload)
    }
  }
})

export const { toggleTheme, loadLocale } = AppSlice.actions
export default AppSlice.reducer
