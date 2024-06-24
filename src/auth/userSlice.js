import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem('email'),
}

export const userSlice = createSlice({
  name: 'myUser',
  initialState,
  reducers: {
    authoriseUser: (state) => {
      state.value = localStorage.getItem('email');
    },
    deAuthoriseUser: (state) => {
      state.value = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { authoriseUser, deAuthoriseUser } = userSlice.actions

export default userSlice.reducer