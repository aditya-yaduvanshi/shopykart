import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { authReducer } from "./reducers/auth";

const store = configureStore({
  reducer: combineReducers({
		auth: authReducer,
  }),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
	useAppDispatch as useDispatch,
	useAppSelector as useSelector,
	store,
};