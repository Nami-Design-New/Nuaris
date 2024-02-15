import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/authenticatedUserSlice";
import users from "./slices/subSetUsers";
import positions from "./slices/positions";

export const store = configureStore({
  reducer: {
    user,
    users,
    positions
  }
});
