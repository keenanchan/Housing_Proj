import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import * as z from 'zod';
import { roomTypeIconsTemp } from '../../assets/icons/all';
import AutoComplete from '../PlacesAutoComplete';
import { RoomType } from '../../assets/constants';
import { WizardFormStep } from '../basics/WizardForm';
import Dropdown from '../basics/Dropdown';
import ToggleGroup from '../basics/ToggleGroup';

export const page1Schema = z.object({
  locationSearch: z.string(),
  selectedLocation: z.string().nonempty('Make sure to select an address.'),
  propertyType: z.string().nonempty('Make sure to select a property type.'),
  // apartmentName: z.string(),
  numBeds: z.string().nonempty('Please enter number of bedrooms.'),
  numBaths: z.string().nonempty('Please enter number of bathrooms.'),
  roomType: z.nativeEnum(RoomType),
});

export type Page1Store = z.infer<typeof page1Schema>;

export const page1InitialStore: Page1Store = {
  locationSearch: '',
  selectedLocation: '',
  propertyType: 'Townhouse', // TODO
  // apartmentName: '',
  numBeds: '',
  numBaths: '',
  roomType: RoomType.Single,
};

const Page1: React.FC<WizardFormStep<Page1Store>> = ({
  locationSearch,
  selectedLocation,
  propertyType,
  // apartmentName,
  numBeds,
  numBaths,
  roomType,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <span className="post-title">Room Information</span>
        </Col>
      </Row>

      <Form.Row className="justify-content-center m-2">
        <Col>
          {/* TODO need to check if the address is valid! Currently, if the user types something in and then clicks enter, it marks it as ok. This issue stems from an issue in PlaceAutoComplete.tsx */}
          <AutoComplete
            label="Address (We automatically calculate time to Price Center)"
            initialAddress={locationSearch}
            onChange={(value) => {
              if (selectedLocation === '') setStore({ locationSearch: value });
              else setStore({ locationSearch: value, selectedLocation: '' });
            }}
            onSelect={(value) => {
              setStore({ locationSearch: value, selectedLocation: value });
            }}
            isValid={validations?.selectedLocation?.success}
            error={validations?.selectedLocation?.error}
            required
          />
        </Col>
      </Form.Row>

      <Form.Row className="m-2 align-bottom">
        <Form.Label className="post-word">
          Unit Size<span className="required-asterisk"> *</span>
        </Form.Label>
        <Col md={5}>
          <Dropdown
            inlineText="Bedrooms"
            options={['1', '2', '3', '4', '5', '6+']}
            initialSelected={numBeds}
            isValid={validations?.numBeds?.success}
            error={validations?.numBeds?.error}
            onSelect={(s) => setStore({ numBeds: s !== null ? s : undefined })}
            noFilter
          />
        </Col>
        <Col md={{ span: 5, offset: 1 }}>
          <Dropdown
            inlineText="Bathrooms"
            options={['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4']}
            initialSelected={numBaths}
            isValid={validations?.numBaths?.success}
            error={validations?.numBaths?.error}
            onSelect={(s) => setStore({ numBaths: s !== null ? s : undefined })}
            noFilter
          />
        </Col>
      </Form.Row>

      <Form.Row className="m-2">
        <ToggleGroup
          singleSelect
          content={[
            { label: RoomType.Single, icon: roomTypeIconsTemp.single },
            { label: RoomType.Double, icon: roomTypeIconsTemp.double },
            { label: RoomType.Triple, icon: roomTypeIconsTemp.triple },
          ]}
          label="Room Type"
          required
          initialSelected={roomType}
          onSelect={({ label, selected }) => {
            setStore({
              roomType: selected ? (label as RoomType) : undefined,
            });
          }}
          error={validations?.roomType?.error}
        />
      </Form.Row>
    </Container>
  );
};

export default Page1 as React.FC;
