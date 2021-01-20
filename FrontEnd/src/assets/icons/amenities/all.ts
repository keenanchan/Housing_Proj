import * as smallAmenitiesIcons from './small/all';
import * as largeAmenitiesIcons from './large/all';

const translations: Record<
  keyof typeof largeAmenitiesIcons | keyof typeof smallAmenitiesIcons,
  string
> = {
  petsFriendly: 'Pets Friendly',
  sharedCommonSpace: 'Common Area',
  furnished: 'Furnished',
  airConditioning: 'A/C',
  smokeFree: 'No Smoking',
  indoorWasher: 'Indoor Laundry',
  outdoorParking: 'Outdoor Parking',
  indoorParking: 'Indoor Parking',
  swimmingPool: 'Swimming Pool',
  hardwoodFloor: 'Hardwood Floor',
  elevator: 'Elevator',
  gym: 'Gym',
};

export { smallAmenitiesIcons, largeAmenitiesIcons, translations };
