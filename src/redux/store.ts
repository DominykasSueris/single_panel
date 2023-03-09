import { configureStore } from "@reduxjs/toolkit";
import authSlice from "redux/reducers/auth";
import logsSlice from "redux/reducers/logs";
import dateSlice from "redux/reducers/searchDate";
import loadingSlice from "redux/reducers/loading";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    logs: logsSlice,
    date: dateSlice,
    loading: loadingSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
