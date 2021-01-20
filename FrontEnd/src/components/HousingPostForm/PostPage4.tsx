import React from 'react';
import * as z from 'zod';
import { WizardFormStep } from '../basics/WizardForm';
import ToggleGroup from '../basics/ToggleGroup';

// TODO put in its own file
enum Preference {
  femaleOnly = 'Female only',
  maleOnly = 'Male only',
  coed = 'Co-ed',
  clean = 'Clean',
  quiet = 'Quiet',
  partyOk = 'Party OK',
  noParty = 'No party',
  extrovert = 'Extrovert',
  introvert = 'Introvert',
  nightOwl = 'Night owl',
  earlyBird = 'Early bird',
  _420Friendly = '420 friendly',
  smokeFree = 'Smoke free',
  lgbtqFriendly = 'LGBTQ+ friendly',
  overnightGuestOk = 'Overnight guest OK',
  noOvernightGuest = 'No overnight Guest',
}

export const page4Schema = z.object({
  preferences: z.string().array(),
});

export type Page4Store = z.infer<typeof page4Schema>;

export const page4InitialStore: Page4Store = {
  preferences: [],
};

const PostPage4: React.FC<WizardFormStep<Page4Store>> = ({
  preferences,
  setStore,
}) => {
  return (
    <ToggleGroup
      label="Please select from the following options to promote what type of person you are looking for to apply for this listing."
      content={Object.values(Preference)}
      initialSelected={preferences}
      onSelect={({ label, selected }) => {
        if (selected) {
          setStore({
            preferences: preferences ? [...preferences, label] : [label],
          });
        } else {
          setStore({
            preferences: preferences?.filter((amenity) => amenity !== label),
          });
        }
      }}
      center
    />
  );
};

export default PostPage4 as React.FC;
