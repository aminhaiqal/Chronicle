"use client";

import { SerializableUser } from '@/interfaces/SerializableUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: SerializableUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authRequest(state) {
            state.loading = true;
            state.error = null;
        },
        authSuccess(state, action: PayloadAction<{ user: SerializableUser }>) {
            state.user = action.payload.user;
            state.loading = false;
            console.log("User signed in:", action.payload.user);
        },
        authFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
        logout(state) {
            state.user = null;
            state.loading = false;
        },
    },
});

export const { authRequest, authSuccess, authFailure, logout } = authSlice.actions;
export default authSlice.reducer;
