import React from 'react';
import * as z from 'zod';
import {
  largeAmenitiesIcons,
  amenitiesTranslations,
} from '../../assets/icons/all';
import { WizardFormStep } from '../basics/WizardForm';
import ToggleGroup from '../basics/ToggleGroup';

// TODO this should be in a different file
type Amenity = keyof typeof largeAmenitiesIcons;

export const page3Schema = z.object({
  amenities: z.string().array(),
});

export type Page3Store = z.infer<typeof page3Schema>;

export const page3InitialStore: Page3Store = {
  amenities: [],
};

const PostPage3: React.FC<WizardFormStep<Page3Store>> = ({
  amenities,
  setStore,
}) => {
  return (
    <ToggleGroup
      toggleClassName="house-post-amenities-toggle"
      label="Please select all the amenities your place offers."
      content={(Object.keys(largeAmenitiesIcons) as [Amenity]).map((key) => ({
        label: amenitiesTranslations[key],
        icon: largeAmenitiesIcons[key],
      }))}
      initialSelected={amenities}
      onSelect={({ label, selected }) => {
        if (selected) {
          setStore({ amenities: amenities ? [...amenities, label] : [label] });
        } else {
          setStore({
            amenities: amenities?.filter((amenity) => amenity !== label),
          });
        }
      }}
      center
    />
  );
};

export default PostPage3 as React.FC;
