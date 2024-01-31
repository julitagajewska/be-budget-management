import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from 'shared-types'

interface CurrentUserState {
  currentUser: User | null
}

const initialState: CurrentUserState = {
  currentUser: {
    id: '65b2ea6dff8304ca54139790',
    username: 'Jan Kowalski',
    email: 'Jan Kowalski'
  }
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUserState>) => {
      state.currentUser = action.payload.currentUser
    }
  }
})

export const { setCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer
