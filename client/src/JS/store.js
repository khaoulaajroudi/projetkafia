import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import contactSlice from "./contactSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    contact:contactSlice
  },
});
