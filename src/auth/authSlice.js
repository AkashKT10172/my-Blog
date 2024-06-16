import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem('isAuth'),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorise: (state) => {
      state.value = true;
    },
    deAuthorise: (state) => {
      state.value = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { authorise, deAuthorise } = authSlice.actions

export default authSlice.reducer