import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getHousingPostsAPI, searchHousingPostsAPI } from '../../apis';
import {
  CreateHousePostProperties,
  HousePost,
  HousePostUserData,
} from '../../assets/models/PostModels';
import { FilterModel } from '../../assets/models/FilterModel';
import { AppThunk, RootState } from '../store';
import {
  addHousingBookmarkAPI,
  getHousingBookmarksAPI,
  newHousingPostAPI,
  removeHousingBookmarkAPI,
} from '../../apis/housing';

// TODO probably split up this housing slice into several folders, where thunks are in a
// folder, selectors in another, reducers in another, and then export them and import
// them to here

// TODO move this to a different file
export enum SearchingMode {
  NOT_SEARCHING,
  STARTED,
  FINISHED,
}

interface HousingState {
  posts?: HousePost[]; // TODO change this to be a object from the housepost's id to the housepost, then change favorites to be id: boolean
  // TODO eventually do this: searchResults?: HousePost[];     and have a 'SearchResultsLoading' boolean
  favorites?: { [id: string]: HousePost };
  searching: SearchingMode;
}

const initialState: HousingState = {
  posts: undefined,
  favorites: undefined,
  searching: SearchingMode.NOT_SEARCHING,
};

export const housingSlice = createSlice({
  name: 'housing',
  initialState,
  reducers: {
    setHousingPosts: (
      state,
      action: PayloadAction<HousePost[] | undefined>,
    ) => {
      state.posts = action.payload;
    },
    appendToHousingPosts: (state, action: PayloadAction<HousePost[]>) => {
      if (state.posts) {
        state.posts.push(...action.payload);
      } else {
        state.posts = action.payload;
      }
    },
    setHousingFavorites: (
      state,
      action: PayloadAction<HousePost[] | undefined>,
    ) => {
      state.favorites = {};
      const newFavorites = action.payload;

      if (newFavorites) {
        newFavorites.forEach((housePost) => {
          if (state.favorites) state.favorites[housePost.roomId] = housePost;
        });
      }
    },
    addToHousingFavorites: (state, action: PayloadAction<HousePost>) => {
      if (!state.favorites) state.favorites = {};

      state.favorites[action.payload.roomId] = action.payload;
    },
    // Pass in the HousePost ID (temporarily use the function defined above)
    removeFromHousingFavorites: (state, action: PayloadAction<number>) => {
      if (state.favorites) {
        delete state.favorites[action.payload];
      }
    },
    setSearchingMode: (state, action: PayloadAction<SearchingMode>) => {
      state.searching = action.payload;
    },
  },
});

// export the reducers that should be accessible by outside files
export const {} = housingSlice.actions;
// do NOT export these reducers. Only declare them and use them in the THUNKS
const {
  setHousingPosts,
  appendToHousingPosts,
  setHousingFavorites,
  addToHousingFavorites,
  removeFromHousingFavorites,
  setSearchingMode,
} = housingSlice.actions;

// PUT THUNKS HERE
export const getHousingPosts = (): AppThunk => async (dispatch) => {
  // get the housing and then set the housing in redux
  const housingPosts = await getHousingPostsAPI();
  dispatch(setHousingPosts(housingPosts));
};

export const searchHousingPosts = (housePost: FilterModel): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(setSearchingMode(SearchingMode.STARTED));
    const searchResults = await searchHousingPostsAPI(housePost);
    dispatch(setHousingPosts(searchResults));
    dispatch(setSearchingMode(SearchingMode.FINISHED));
  } catch (err) {
    // handle error
  }
};

// TODO double check that CreateHousePostProperties works. it was HousePost previously
export const newHousingPost = (
  housePost: CreateHousePostProperties,
): AppThunk => async (dispatch, getState) => {
  const email = getState().auth.user?.email;
  if (!email) return;

  const result = await newHousingPostAPI({ ...housePost, email });
  if (result) {
    window.location.reload(false);
    // TODO cannot do the below until the newHousingPostAPI is changed to return roomId
    // dispatch(
    //   appendToHousingPosts([
    //     { ...housePost, ...curUserMappedToHouseProperties },
    //   ]),
    // );
  } else {
    // handle the error
  }
};

export const resetHousingFavorites = (): AppThunk => async (dispatch) => {
  dispatch(setHousingFavorites(undefined));
};

export const getHousingFavorites = (): AppThunk => async (
  dispatch,
  getState,
) => {
  const { user } = getState().auth;
  if (!user) return;

  const favorites = await getHousingBookmarksAPI();
  if (favorites) {
    dispatch(setHousingFavorites(favorites));
  }
  // handle errors here
};

export const newHousingFavorite = (housePost: HousePost): AppThunk => async (
  dispatch,
  getState,
) => {
  const { user } = getState().auth;
  if (!user) {
    dispatch(addToHousingFavorites(housePost));
    return;
  }

  // TODO eventually change the housePost in here to just be the housePostId
  const result = await addHousingBookmarkAPI(housePost.roomId);
  if (result) {
    dispatch(addToHousingFavorites(housePost));
  } else {
    // handle error here
  }
};

export const removeHousingFavorite = (roomId: number): AppThunk => async (
  dispatch,
  getState,
) => {
  const { user } = getState().auth;
  if (!user) {
    dispatch(removeFromHousingFavorites(roomId));
    return;
  }

  const result = await removeHousingBookmarkAPI(roomId);
  if (result) {
    dispatch(removeFromHousingFavorites(roomId));
  } else {
    // handle error here
  }
};

export const postAllHousingFavorites = (): AppThunk => async (
  dispatch,
  getState,
) => {
  const { favorites } = getState().housing;
  if (favorites) {
    Object.values(favorites).forEach((favorite) => {
      addHousingBookmarkAPI(favorite.roomId);
    });
  }
};

// SELECTORS HERE
export const selectHousingPosts = (state: RootState) => state.housing.posts;
export const selectHousingSearchMode = (state: RootState) =>
  state.housing.searching;
export const selectHousingFavorites = (state: RootState) =>
  state.housing.favorites;

export default housingSlice.reducer;
