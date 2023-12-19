import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

export interface MonthPickerState {
  selectedDate: string
}

const initialState: MonthPickerState = {
  selectedDate: ''
}

export const counterSlice = createSlice({
  name: 'monthPicker',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload
    },
    increaseMonth: (state) => {
      state.selectedDate = dayjs(state.selectedDate).add(1, 'month').toString()
    },
    decreaseMonth: (state) => {
      state.selectedDate = dayjs(state.selectedDate).subtract(1, 'month').toString()
    }
  }
})

export const { setSelectedDate, increaseMonth, decreaseMonth } = counterSlice.actions

export default counterSlice.reducer
