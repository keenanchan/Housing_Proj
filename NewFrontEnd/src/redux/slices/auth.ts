import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from '../store';

interface User {}

interface AuthState {
  user?: User;
}

const initialState: AuthState = {
  user: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

// Export actions that were defined with createSlice
export const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (loginCredentials: number): AppThunk => async (
  dispatch,
) => {
  const user = await axios.get('our url here', { params });
  dispatch(setUser(user));
};

export default authSlice.reducer;
