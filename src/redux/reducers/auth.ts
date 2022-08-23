import { createSlice, Slice } from "@reduxjs/toolkit";
import { AuthInitialState } from "../../types/redux";
import { register } from "../actions/auth";

const initialState: AuthInitialState = {
  user: null,
  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  accessExpiry: null,
  refreshExpiry: null,
}

const auth: Slice<AuthInitialState> = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(register.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(register.rejected, (state, action) => {
      state.error = action.error;
    })
})

const authReducer = auth.reducer;

export {authReducer};