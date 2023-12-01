import { configureStore } from '@reduxjs/toolkit'
import pageHeaderReducer from './slices/pageHeaderSlice'

export const store = configureStore({
  reducer: {
    pageHeader: pageHeaderReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
