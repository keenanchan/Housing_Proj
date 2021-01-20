import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { auth, housing, filter } from './slices/index';

export const store = configureStore({
  reducer: {
    auth,
    housing,
    filter,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
