/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: any | null;
    idToken: string | null;
    resfreshToken: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    idToken: null,
    resfreshToken: null,
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
        authSuccess(state, action: PayloadAction<{ user: any, idToken: string, refreshToken: string }>) {
            state.user = action.payload.user;
            state.idToken = action.payload.idToken;
            state.resfreshToken = action.payload.user.refreshToken;
            state.loading = false;
        },
        authFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
        logout(state) {
            state.user = null;
            state.idToken = null;
        },
    },
});

export const { authRequest, authSuccess, authFailure, logout } = authSlice.actions;
export default authSlice.reducer;
