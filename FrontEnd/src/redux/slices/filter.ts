import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FilterState {
  show: boolean;
}
const initialState: FilterState = {
  show: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

export const { setShow } = filterSlice.actions;
export const selectShowFilter = (state: RootState) => state.filter.show;
export default filterSlice.reducer;
