import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/authenticatedUserSlice";

export const store = configureStore({
  reducer: {
    user
  }
});
