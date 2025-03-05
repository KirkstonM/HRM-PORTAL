import React from 'react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { baseHttpRequest } from '../RTKQuery/HttpRequest.js'
import AppReducer from '../Slices/AppSlice.js'
import EmployeeReducer from '../Slices/EmployeeDetailsSlice.js'
import { setupListeners } from '@reduxjs/toolkit/query'

const rootReducer = combineReducers({
  app: AppReducer,
  employee: EmployeeReducer,
  [baseHttpRequest.reducerPath]: baseHttpRequest.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseHttpRequest.middleware)
})

setupListeners(store.dispatch)
