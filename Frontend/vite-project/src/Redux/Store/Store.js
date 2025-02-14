import React from "react";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseHttpRequest } from '../RTKQuery/HttpRequest.js';
import AppReducer from '../Slices/AppSlice.js'

const rootReducer = combineReducers({
  app : AppReducer,
  [baseHttpRequest] : baseHttpRequest.reducer
});

const store = configureStore({
  reducer : rootReducer,
  middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseHttpRequest.middleware)
});

export default store;
