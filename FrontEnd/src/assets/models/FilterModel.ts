import { RoomType } from '../constants';

export interface FilterModel {
  distance: string;
  roomType: RoomLiteralType[];
  priceMin: number;
  priceMax: number;
  earlyInterval: string;
  earlyMonth: string;
  lateInterval: string;
  lateMonth: string;
  stayPeriod: number;
  other: string[];
  facilities: string[];
  numBeds: string;
  numBaths: string;
}

export interface Preferences {
  female: boolean;
  male: boolean;
  lgbtq: boolean;
  parking: boolean;
  pets: boolean;
  privateBath: boolean;
  _420: boolean;
}
// TODO the version you should use
// interface Preferences {
//   female: boolean;
//   male: boolean;
//   LGBTQ: boolean;
//   parking: boolean;
//   pets: boolean;
//   privateBath: boolean;
//   _420: boolean;
//   earlyBird: boolean;
//   elevator: boolean;
//   furnished: boolean;
//   grocery: boolean;
//   gym: boolean;
//   hardwood: boolean;
//   livingRoomPeople: boolean;
//   nightOwl: boolean;
//   noSmoke: boolean;
//   patio: boolean;
//   pool: boolean;
//   washerDryer: boolean;
// }

export type RoomLiteralType = keyof typeof RoomType;
export type PreferenceLiteralType = keyof Preferences;
