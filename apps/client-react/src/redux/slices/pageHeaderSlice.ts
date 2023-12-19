import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type PageHeaderButtonType =
  | 'DASHBOARD_SETTINGS'
  | 'TRANSACTION'
  | 'INCOME'
  | 'EXPENSE'
  | 'GOAL'
  | 'ACCOUNT'
  | 'REPORTS'
  | 'EDIT_ACCOUNT'

export interface PageHeaderState {
  pageName: string
  isMonthPickerVisible: boolean
  isSideButtonVisible: boolean
  buttonType?: PageHeaderButtonType
}

const initialState: PageHeaderState = {
  pageName: '',
  isMonthPickerVisible: false,
  isSideButtonVisible: false,
  buttonType: 'DASHBOARD_SETTINGS'
}

export const counterSlice = createSlice({
  name: 'pageHeader',
  initialState,
  reducers: {
    setPageHeaderState: (state, action: PayloadAction<PageHeaderState>) => {
      state.pageName = action.payload.pageName
      state.isMonthPickerVisible = action.payload.isMonthPickerVisible
      state.isSideButtonVisible = action.payload.isSideButtonVisible
      state.buttonType = action.payload.buttonType
    },
    setPageName: (state, action: PayloadAction<string>) => {
      state.pageName = action.payload
    },
    setIsMonthPickerVisible: (state, action: PayloadAction<boolean>) => {
      state.isMonthPickerVisible = action.payload
    },
    setIsSideButtonVisible: (state, action: PayloadAction<boolean>) => {
      state.isSideButtonVisible = action.payload
    },
    setButtonType: (state, action: PayloadAction<PageHeaderButtonType>) => {
      state.buttonType = action.payload
    }
  }
})

export const {
  setPageHeaderState,
  setPageName,
  setIsMonthPickerVisible,
  setIsSideButtonVisible,
  setButtonType
} = counterSlice.actions

export default counterSlice.reducer
