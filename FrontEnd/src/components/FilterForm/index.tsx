import React from 'react';
import { useDispatch } from 'react-redux';
import { searchHousingPosts } from '../../redux/slices/housing';
import FilterPage1, {
  Page1Store,
  page1InitialStore,
  page1Schema,
} from './FilterPage1';
import FilterPage2, {
  Page2Store,
  page2InitialStore,
  page2Schema,
} from './FilterPage2';
import FilterPage3, {
  Page3Store,
  page3InitialStore,
  page3Schema,
} from './FilterPage3';
import FilterPage4, {
  Page4Store,
  page4InitialStore,
  page4Schema,
} from './FilterPage4';
import FilterPage5, {
  Page5Store,
  page5InitialStore,
  page5Schema,
} from './FilterPage5';
import FilterPage6, {
  Page6Store,
  page6InitialStore,
  page6Schema,
} from './FilterPage6';
import WizardForm from '../basics/WizardForm';
import {
  FilterModel,
  PreferenceLiteralType,
  Preferences,
  RoomLiteralType,
} from '../../assets/models/FilterModel';
import { RoomType } from '../../assets/constants';

type enumCheckSuccess<T extends { [index: string]: string }> = {
  key: keyof T;
  success: boolean;
};
type enumCheckFail = { key: undefined; success: boolean };
const enumKeyFromStringValue = <T extends { [index: string]: string }>(
  e: T,
  v: string,
): enumCheckSuccess<T> | enumCheckFail => {
  const keys = Object.keys(e).filter((x) => e[x] === v);
  return keys.length > 0
    ? {
        key: keys[0],
        success: true,
      }
    : {
        key: undefined,
        success: false,
      };
};
const checkSuccess = <T extends { [index: string]: string }>(
  result: enumCheckSuccess<T> | enumCheckFail,
): result is enumCheckSuccess<T> => {
  return result.success;
};

type Store = Page1Store &
  Page2Store &
  Page3Store &
  Page4Store &
  Page5Store &
  Page6Store;

const initialStore = [
  page1InitialStore,
  page2InitialStore,
  page3InitialStore,
  page4InitialStore,
  page5InitialStore,
  page6InitialStore,
];

const schemas = [
  page1Schema,
  page2Schema,
  page3Schema,
  page4Schema,
  page5Schema,
  page6Schema,
];

// TODO: this is still the old filter format. update
// to new one ASAP!
const formatRequest = (s: Store): FilterModel => {
  // const roomSelections: RoomLiteralType[] = [
  //   'single',
  //   'double',
  //   'triple',
  //   'livingRoom',
  //   'suite',
  //   'studio',
  // ];
  const otherPrefs: PreferenceLiteralType[] = [
    'female',
    'male',
    'lgbtq',
    'pets',
    '_420',
  ];
  const facilities: PreferenceLiteralType[] = ['parking', 'privateBath'];

  const selectedRooms = s.roomTypes.reduce<RoomLiteralType[]>(
    (result, type) => {
      const r = enumKeyFromStringValue(RoomType, type);
      if (checkSuccess(r)) {
        result.push(r.key);
      }
      return result;
    },
    [],
  );

  // const selectedPrefs = otherPrefs.reduce<PreferenceLiteralType[]>(
  //   (result, preference) => {
  //     const r = enumKeyFromStringValue(, type)
  //   }
  // );

  return {
    numBeds: s.numBeds,
    numBaths: s.numBaths,
    distance: `${s.distance} mins`,
    roomType: selectedRooms,
    stayPeriod: s.stayPeriod,
    priceMin: s.minPrice,
    priceMax: s.maxPrice,
    earlyInterval: s.earlyInterval as string,
    earlyMonth: s.earlyMonth as string,
    lateInterval: s.lateInterval as string,
    lateMonth: s.lateMonth as string,
    other: s.preferences,
    facilities: s.amenities,
  };
};

interface FilterFormProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ show, setShow }) => {
  const dispatch = useDispatch();
  return (
    <WizardForm<Store>
      show={show}
      setShow={setShow}
      onSubmit={(n) => {
        console.log('clicked');
        console.log(n);
        const formattedRequest = formatRequest(n);
        console.log(formattedRequest);
        dispatch(searchHousingPosts(formattedRequest));
        return true;
      }}
      title="Filter & Match"
      initialStore={initialStore}
      schemas={schemas}
    >
      <FilterPage1 />
      <FilterPage2 />
      <FilterPage3 />
      <FilterPage4 />
      <FilterPage5 />
      <FilterPage6 />
    </WizardForm>
  );
};

export default FilterForm;
