import React from 'react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { baseHttpRequest } from '../RTKQuery/HttpRequest.js'
import AppReducer from '../Slices/AppSlice.js'
import EmployeeReducer from '../Slices/EmployeeDetailsSlice.js'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const appReducer = combineReducers({
  app: AppReducer,
  employee: EmployeeReducer,
  [baseHttpRequest.reducerPath]: baseHttpRequest.reducer
})

const rootReducer = (state, action) => {
  if (action.type === 'app/reset') {
    state = undefined
  }
  return appReducer(state, action)
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app', 'employee']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(baseHttpRequest.middleware)
})

export const persistor = persistStore(store)
setupListeners(store.dispatch)
