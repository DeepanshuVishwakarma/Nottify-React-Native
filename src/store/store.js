import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/slice.js";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
