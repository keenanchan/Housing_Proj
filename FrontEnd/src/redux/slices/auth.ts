import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { AppThunk, RootState } from '../store'; // TODO
import {
  userLogIn,
  userLogOut,
  userEditProfile,
  createNewUserApi,
  addHousingBookmarkAPI,
} from '../../apis/index';
import { User, UserNameEmail } from '../../assets/models/User';
import {
  getHousingFavorites,
  postAllHousingFavorites,
  resetHousingFavorites,
} from './housing';

const cookies = new Cookies();

interface AuthState {
  user?: User;
  userDraft?: User; // TODO change this to not be stored in redux and cookies
  showNewUserPopup?: UserNameEmail;
}

const initialState: AuthState = {
  user: cookies.get<User>('user'),
  userDraft: cookies.get<User>('userDraft'),
  showNewUserPopup: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
      if (action.payload) {
        cookies.set('user', action.payload, {
          // TODO should probably set this from the backend as well (similar to access_token)
          maxAge: 4320, // expires  72 hours after login
        });
      } else {
        cookies.remove('user');
      }
    },
    setUserDraft: (state, action: PayloadAction<User | undefined>) => {
      state.userDraft = action.payload;
      if (action.payload) {
        cookies.set('userDraft', action.payload, {
          // TODO should probably set this from the backend as well (similar to access_token)
          maxAge: 4320, // expires  72 hours after login
        });
      } else {
        cookies.remove('userDraft');
      }
    },
    startNewUserFlow: (
      state,
      action: PayloadAction<UserNameEmail | undefined>,
    ) => {
      state.showNewUserPopup = action.payload;
    },
    endNewUserFlow: (state) => {
      state.showNewUserPopup = undefined;
    },
  },
});

// Export actions that were defined with createSlice
export const {
  setUser,
  setUserDraft,
  startNewUserFlow,
  endNewUserFlow,
} = authSlice.actions;

// Thunks here
export const login = (name: string, email: string): AppThunk => async (
  dispatch,
) => {
  const response = await userLogIn(name, email);
  if (response) {
    if ('newUser' in response) {
      dispatch(startNewUserFlow({ name, email }));
    } else {
      dispatch(
        setUser({
          profilePhoto: response.profilePhoto,
          name: response.name,
          email: response.email,
          token: response.token,
          description: response.description,
          major: response.major,
          schoolYear: response.schoolYear,
          phone: response.phone,
        }),
      );
      dispatch(
        setUserDraft({
          profilePhoto: response.profilePhoto,
          name: response.name,
          email: response.email,
          token: response.token,
          description: response.description,
          major: response.major,
          schoolYear: response.schoolYear,
          phone: response.phone,
        }),
      );
      await dispatch(postAllHousingFavorites());
      dispatch(getHousingFavorites());
    }
  }
};

// TODO this doesn't seem to be able to handle when the cookie times out
export const logout = (): AppThunk => async (dispatch, getState) => {
  // remove cookies here, which will automatically update the user
  const token = getState().auth.user?.token;
  if (!token) return; // TODO doesn't work well anymore. I think it's cause we changed the backend

  const response = await userLogOut(token);
  if (response) {
    dispatch(setUser(undefined));
    dispatch(setUserDraft(undefined)); // TODO not sure if this is needed
    dispatch(resetHousingFavorites());
  }
};

export const createNewUser = (
  user: Omit<User, 'token' | 'profilePhoto'>,
): AppThunk => async (dispatch) => {
  const response = await createNewUserApi(user);
  if (!response) {
    // handle error
    return;
  }

  await dispatch(login(response.name, response.email));
  dispatch(endNewUserFlow());
};

export const editProfile = (
  email: string,
  userDraft: User,
  kvPairs: any,
  onSucess: Function,
): AppThunk => async (dispatch) => {
  const response = await userEditProfile(email, kvPairs);
  if (response) {
    onSucess(true);
    dispatch(setUser(userDraft));
  }
};

// Selects here
const selectUser = (state: RootState) => state.auth.user;
const selectUserDraft = (state: RootState) => state.auth.userDraft;
const selectShowNewUserPopup = (state: RootState) =>
  state.auth.showNewUserPopup;
export { selectUser, selectUserDraft, selectShowNewUserPopup };

// Export everything
export default authSlice.reducer;
