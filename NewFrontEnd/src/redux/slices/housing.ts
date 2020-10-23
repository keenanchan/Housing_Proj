import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from '../store';

interface HousingPost {
  title: string;
  // add more...
}

interface HousingState {
  posts?: HousingPost[];
}

const initialState: HousingState = {
  posts: undefined,
};

export const housingSlice = createSlice({
  name: 'housing',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setHousingPosts: (state, action: PayloadAction<HousingPost[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { setHousingPosts } = housingSlice.actions;

// thunks below
export const updateHousingPosts = (): AppThunk => (dispatch) => {
  // await simulation
  setTimeout(() => {
    dispatch(setHousingPosts([]));
  }, 1000);
};

export const getHousingPosts = (): AppThunk => async (dispatch) => {
  // 1) get the data
  const posts = await axios.get('our url', { params });

  // 2) set the data in the state using dispatch
  dispatch(setHousingPosts(posts));
};

export const selectingHousingPosts = (state: RootState) => state.housing.posts;

export default housingSlice.reducer;
