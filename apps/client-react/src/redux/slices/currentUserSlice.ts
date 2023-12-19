import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from 'shared-types'

interface CurrentUserState {
  currentUser: User | null
}

const initialState: CurrentUserState = {
  currentUser: {
    id: '6546a20d7b908bebe9ec9ad4',
    username: 'JanKowalski123',
    email: 'j.kowalski@gmail.com'
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
