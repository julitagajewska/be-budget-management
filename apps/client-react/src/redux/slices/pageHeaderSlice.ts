import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PageHeaderState {
  pageName: string
  // TODO: motnh picker
}

const initialState: PageHeaderState = {
  pageName: ''
}

export const counterSlice = createSlice({
  name: 'pageHeader',
  initialState,
  reducers: {
    setPageName: (state, action: PayloadAction<string>) => {
      state.pageName = action.payload
    }
  }
})

export const { setPageName } = counterSlice.actions

export default counterSlice.reducer
