import { configureStore } from '@reduxjs/toolkit'
import pageHeaderReducer from './slices/pageHeaderSlice'
import monthPickerReducer from './slices/monthPickerSlice'

export const store = configureStore({
  reducer: {
    pageHeader: pageHeaderReducer,
    monthPicker: monthPickerReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
