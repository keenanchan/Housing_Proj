import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import * as z from 'zod';
import { RoomType } from '../../assets/constants';
import { roomTypeIconsTemp } from '../../assets/icons/all';
import { WizardFormStep } from '../basics/WizardForm';
import Dropdown from '../basics/Dropdown';
import ToggleGroup from '../basics/ToggleGroup';

export const page2Schema = z.object({
  numBeds: z.string(),
  numBaths: z.string(),
  roomTypes: z.nativeEnum(RoomType).array(),
});

export type Page2Store = z.infer<typeof page2Schema>;

export const page2InitialStore: Page2Store = {
  numBeds: '0',
  numBaths: '0',
  roomTypes: [],
};

const FilterPage2: React.FC<WizardFormStep<Page2Store>> = ({
  numBeds,
  numBaths,
  roomTypes,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row className="justify-content-center m-2 my-4">
        <div className="post-title">Unit / Room Type</div>
      </Row>

      <br />

      <Form.Row className="m-2">
        <Col>
          <Form.Label className="filterform-word">Unit Size</Form.Label>
        </Col>
      </Form.Row>
      <Form.Row className="m-2">
        <Col md={5}>
          <Dropdown
            options={['0', '1', '2', '3', '4', '5']}
            initialSelected={numBeds}
            // className="filterform-short-dropdown"
            inlineText="Bedrooms"
            isValid={validations?.numBeds?.success}
            error={validations?.numBeds?.error}
            onSelect={(s, e) =>
              setStore({ numBeds: s !== null ? s : undefined })
            }
            noFilter
          />
        </Col>
        <Col md={{ span: 5, offset: 1 }}>
          <Dropdown
            options={['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4']}
            initialSelected={numBaths}
            // className="filterform-short-dropdown"
            inlineText="Bathrooms"
            isValid={validations?.numBaths?.success}
            error={validations?.numBaths?.error}
            onSelect={(s, e) =>
              setStore({ numBaths: s !== null ? s : undefined })
            }
            noFilter
          />
        </Col>
      </Form.Row>

      <Form.Row className="m-2 mt-5">
        <Col>
          <ToggleGroup
            content={[
              { label: RoomType.Single, icon: roomTypeIconsTemp.single },
              { label: RoomType.Double, icon: roomTypeIconsTemp.double },
              { label: RoomType.Triple, icon: roomTypeIconsTemp.triple },
            ]}
            label="Room Type (select all that apply)"
            initialSelected={roomTypes}
            onSelect={({ label, selected }) => {
              if (selected) {
                setStore({
                  roomTypes: roomTypes
                    ? [...roomTypes, label as RoomType]
                    : [label as RoomType],
                });
              } else {
                setStore({
                  roomTypes: roomTypes?.filter(
                    (roomType) => roomType !== label,
                  ),
                });
              }
            }}
            error={validations?.roomTypes?.error}
          />
        </Col>
      </Form.Row>
    </Container>
  );
};

export default FilterPage2 as React.FC;
