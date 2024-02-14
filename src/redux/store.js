import { configureStore } from '@reduxjs/toolkit'
import user from "./slices/authenticatedUserSlice"
import users from "./slices/subSetUsers"

export const store = configureStore({
  reducer: {
    user,
    users,
  },
})