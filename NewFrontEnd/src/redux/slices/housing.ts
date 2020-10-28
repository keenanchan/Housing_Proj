import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { getHousing } from '../../apis/index';
import { facilityToIcon } from '../../components/HouseProfile';

interface HousingPost {
  name: string;
  pricePerMonth: number;
  roomType: string;
  early: string;
  late: string;
  distance: string;
  location: string;
  photo: string[];
  profilePhoto: string;
  stayPeriod: number;
  leaserName: string;
  leaserSchoolYear: number;
  leaserMajor: string;
  leaserIntro: string;
  leaserEmail: string;
  leaserPhone: string;
  other: string[];
  facilities: (
    | 'Parking'
    | 'Elevator'
    | 'Gym room'
    | 'Swimming pool'
    | 'Pets friendly'
    | 'Indoor washer'
  )[]; // TODO: figure out how to pass facilityToIcon here from HouseProfile
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
  getHousing().then((response) => {
    if (response) {
      dispatch(setHousingPosts(
        response.map((room) => ({
          name: room['name'],
          pricePerMonth: room['pricePerMonth'],
          roomType: room['roomType'],
          early: room['early'],
          late: room['late'],
          distance: room['distance'],
          location: room['location'],
          photo: room['photo'],
          profilePhoto: room['profilePhoto'],
          stayPeriod: room['stayPeriod'],
          leaserName: room['leaserName'],
          leaserSchoolYear: room['leaserSchoolYear'],
          leaserMajor: room['leaserMajor'],
          leaserIntro: room['leaserIntro'],
          leaserEmail: room['leaserEmail'],
          leaserPhone: room['leaserPhone'],
          other: room['other'],
          facilities: room['facilities'],
        }))
      ))
    }
  });
}

export const selectingHousingPosts = (state: RootState) => state.housing.posts;

export default housingSlice.reducer;
