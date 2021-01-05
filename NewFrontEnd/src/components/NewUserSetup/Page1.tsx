import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as z from 'zod';
import { Form } from 'react-bootstrap';
import { WizardFormStep } from '../WizardForm';
import { SchoolYear, NON_EMPTY_ERR_MSG, majors } from '../../assets/constants';
import Input from '../basics/Input';
import Dropdown from '../basics/Dropdown';

const nonSelectStyle = 'post-word-sub';
const selectStyle = 'post-word-sub post-word-sub-selected';
const nonSelectBg = 'post-word-sub-bg';
const SelectBg = 'post-word-sub-bg post-word-sub-bg-selected';

// TODO put in constants
const phoneRegex = /^([ ]*\+?[ ]*[0-9]{0,4}[ ]*(-|\()?[0-9]{3}[ ]*(-|\))?[ ]*[0-9]{3}[ ]*-?[ ]*[0-9]{4}[ ]*)$/;

export const page1Schema = z.object({
  name: z.string().nonempty(NON_EMPTY_ERR_MSG),
  email: z.string().email('Email is not in a valid format.'),
  phone: z
    .string()
    .nonempty(NON_EMPTY_ERR_MSG)
    .regex(phoneRegex, 'Phone number is not a valid format.'),
  schoolYear: z.nativeEnum(SchoolYear),
  major: z.string().nonempty(NON_EMPTY_ERR_MSG).min(1, 'Not long enough.'),
});

export type Page1Store = z.infer<typeof page1Schema>;

export const page1InitialStore: Page1Store = {
  name: '',
  email: '',
  phone: '',
  schoolYear: SchoolYear.First,
  major: '',
};

const Page1: React.FC<WizardFormStep<Page1Store>> = ({
  name,
  email,
  phone,
  schoolYear,
  major,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row className="justify-content-center m-2">
        <Col md={12}>
          <Input
            label="Name"
            type="text"
            value={name}
            required
            onChange={(e) => setStore({ name: e.target.value })}
            placeholder="Name"
            isValid={validations?.name?.success}
            error={validations?.name?.error}
          />
        </Col>
      </Row>

      <Row className="justify-content-center m-2">
        <Col sm={12} md={6}>
          <Input label="Email" type="text" value={email} readOnly />
        </Col>

        <Col sm={12} md={6}>
          <Input
            label="Phone"
            type="text"
            value={phone}
            required
            onChange={(e) => setStore({ phone: e.target.value })}
            placeholder="Phone number"
            isValid={validations?.phone?.success}
            error={validations?.phone?.error}
          />
        </Col>
      </Row>

      <Row className="justify-content-center m-2 pl-3">
        <Col>
          <Row className="post-word">School year</Row>
          {/* <br /> */}
          <Row className="my-2">
            <div
              className={
                schoolYear === SchoolYear.First ? SelectBg : nonSelectBg
              }
            >
              <span
                className={
                  schoolYear === SchoolYear.First ? selectStyle : nonSelectStyle
                }
                onClick={() => setStore({ schoolYear: SchoolYear.First })}
              >
                First
              </span>
            </div>
            <div
              className={
                schoolYear === SchoolYear.Second ? SelectBg : nonSelectBg
              }
            >
              <span
                className={
                  schoolYear === SchoolYear.Second
                    ? selectStyle
                    : nonSelectStyle
                }
                onClick={() => setStore({ schoolYear: SchoolYear.Second })}
              >
                Sophomore
              </span>
            </div>
            <div
              className={
                schoolYear === SchoolYear.Third ? SelectBg : nonSelectBg
              }
            >
              <span
                className={
                  schoolYear === SchoolYear.Third ? selectStyle : nonSelectStyle
                }
                onClick={() => setStore({ schoolYear: SchoolYear.Third })}
              >
                Junior
              </span>
            </div>
            <div
              className={
                schoolYear === SchoolYear.Fourth ? SelectBg : nonSelectBg
              }
            >
              <span
                className={
                  schoolYear === SchoolYear.Fourth
                    ? selectStyle
                    : nonSelectStyle
                }
                onClick={() => setStore({ schoolYear: SchoolYear.Fourth })}
              >
                Senior
              </span>
            </div>
            <div
              className={
                schoolYear === SchoolYear.Fifth ? SelectBg : nonSelectBg
              }
            >
              <span
                className={
                  schoolYear === SchoolYear.Fifth ? selectStyle : nonSelectStyle
                }
                onClick={() => setStore({ schoolYear: SchoolYear.Fifth })}
              >
                Fifth
              </span>
            </div>
            <div
              className={
                schoolYear === SchoolYear.Grad ? SelectBg : nonSelectBg
              }
            >
              <span
                className={
                  schoolYear === SchoolYear.Grad ? selectStyle : nonSelectStyle
                }
                onClick={() => setStore({ schoolYear: SchoolYear.Grad })}
              >
                Grad
              </span>
            </div>
          </Row>
        </Col>
      </Row>

      <Row className="justify-content-center m-2">
        <Col md={12}>
          <Dropdown
            options={majors}
            label="Major"
            onSelect={(s) => setStore({ major: s || undefined })}
            initialSelected={major}
            placeholder="Major"
            isValid={validations?.major?.success}
            error={validations?.major?.error}
            required
          />
        </Col>
      </Row>
    </Container>
  );
};

// NOTE: need the "as React.FC" since typescript doesn't know that WizardForm parent component will
// provide the WizardFormStep props
export default Page1 as React.FC;
