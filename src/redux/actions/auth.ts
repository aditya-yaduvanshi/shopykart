import {createAsyncThunk, createAction} from '@reduxjs/toolkit';

export const register = createAsyncThunk('auth/register', async () => {});

export const signin = createAsyncThunk('auth/signin', async () => {});
