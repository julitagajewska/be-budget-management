import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from './slices/currentUserSlice'
import pageHeaderReducer from './slices/pageHeaderSlice'
import monthPickerReducer from './slices/monthPickerSlice'
import { apiSlice } from './api/apiSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    currentUser: currentUserReducer,
    pageHeader: pageHeaderReducer,
    monthPicker: monthPickerReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
