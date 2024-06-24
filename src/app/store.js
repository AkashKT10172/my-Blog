import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../auth/authSlice'
import userReducer from '../auth/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    myUser: userReducer
  },
})