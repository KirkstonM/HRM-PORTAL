import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  locale: {},
  theme: 'dark'
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
    }
  }
})

export const { toggleTheme, loadLocale } = AppSlice.actions
export default AppSlice.reducer
