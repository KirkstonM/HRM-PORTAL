import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  locale: {},
  theme: 'light',
  token: true,
  user: {
    email: '',
    resetPasswordEmail: '',
    resetLinkSubmitted: null
  },
  userData: null,
  allEmployees: null,
  selectedEmployee: null
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
    },
    setNewUserEmail: (state, action) => {
      state.user.email = action.payload
    },
    setResetPasswordEmail: (state, action) => {
      state.user.resetPasswordEmail = action.payload
    },
    toggleResetPasswordSubmitted: (state, action) => {
      state.user.resetLinkSubmitted = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    loadAllUsers: (state, action) => {
      state.allEmployees = action.payload
    },
    filterUserData: (state, action) => {
      console.log(action)
      const emp = state.allEmployees.find(
        (emp) => emp?._id === action.payload.id
      )
      if (emp) {
        state.selectedEmployee = emp
      }
    }
  }
})

export const {
  toggleTheme,
  loadLocale,
  toggleToken,
  setNewUserEmail,
  setResetPasswordEmail,
  toggleResetPasswordSubmitted,
  setUserData,
  loadAllUsers,
  filterUserData
} = AppSlice.actions
export default AppSlice.reducer
