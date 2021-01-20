import navIcons from './nav/all';
import preferencesIcons, {
  preferencesChosen,
  preferencesUnchosen,
} from './preferences/all';
import roomTypeIcons from './roomType/all';
import contactIcons from './contact/all';
import miscIcons from './misc/all';
import facilityIcons from './facilities/all';
import filterIcons from './filter/all';
import carouselIcons from './carousel/all';
import mapIcons from './map/all';
import bookmarkIcons from './bookmarks/all';
import loading from './loading/all';
import profileIcons from './profile/all';
import landingIcons from './landing/all';
import * as roomTypeIconsTemp from './roomTypeCorrect/all'; // TODO rename correctly
import {
  smallAmenitiesIcons,
  largeAmenitiesIcons,
  translations as amenitiesTranslations,
} from './amenities/all';

export type Icon = typeof navIcons.logo;
export type IconProps = React.SVGProps<SVGSVGElement>;

export {
  navIcons,
  preferencesIcons,
  preferencesChosen,
  preferencesUnchosen,
  roomTypeIcons,
  roomTypeIconsTemp,
  contactIcons,
  miscIcons,
  facilityIcons,
  filterIcons,
  carouselIcons,
  mapIcons,
  bookmarkIcons,
  loading,
  profileIcons,
  landingIcons,
  smallAmenitiesIcons,
  largeAmenitiesIcons,
  amenitiesTranslations,
};
