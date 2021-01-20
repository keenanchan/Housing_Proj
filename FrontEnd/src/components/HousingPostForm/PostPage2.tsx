import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import * as z from 'zod';
import { Month, Interval } from '../../assets/constants';
import { moveInSelect } from '../../assets/utils/index';
import { WizardFormStep } from '../basics/WizardForm';
import Input from '../basics/Input';
import Dropdown from '../basics/Dropdown';

export const page2Schema = z
  .object({
    stayPeriod: z.number(),
    earlyInterval: z.nativeEnum(Interval),
    earlyMonth: z.nativeEnum(Month),
    lateInterval: z.nativeEnum(Interval),
    lateMonth: z.nativeEnum(Month),
    price: z
      .number()
      .positive('Make sure price is valid.')
      .max(10000, 'This is not feasible for a college student!'),
  })
  // .refine(
  //   (data) =>
  //     moveInSelect(
  //       data.earlyInterval,
  //       data.earlyMonth,
  //       data.lateInterval,
  //       data.lateMonth,
  //     ),
  //   { message: 'Choose a valid date range', path: ['earlyInterval'] },
  // );

export type Page2Store = z.infer<typeof page2Schema>;
type Page2CorrectlyTypedStore = Partial<Page2Store>;

export const page2InitialStore: Page2CorrectlyTypedStore = {
  stayPeriod: 12,
  earlyInterval: Interval.Anytime,
  earlyMonth: Month.Anytime,
  lateInterval: Interval.Anytime,
  lateMonth: Month.Anytime,
  price: undefined,
};

const Page2: React.FC<WizardFormStep<Page2CorrectlyTypedStore>> = ({
  stayPeriod,
  earlyInterval,
  earlyMonth,
  lateInterval,
  lateMonth,
  price,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="post-title">Rental Dates</div>
        </Col>
      </Row>

      <Form.Row className="m-2">
        <Col>
          <Form.Label className="post-word">Move-In Timeframe</Form.Label>
        </Col>
      </Form.Row>
      <Form.Row className="m-2">
        <Col md={2}>
          <Form.Label className="post-word my-2">From</Form.Label>
        </Col>
        <Col md={5}>
          <Dropdown
            options={Object.keys(Interval)}
            initialSelected={earlyInterval}
            placeholder="Date"
            // className="filterform-short-dropdown"
            isValid={validations?.earlyInterval?.success}
            error={validations?.earlyInterval?.error}
            onSelect={(s) =>
              setStore({
                earlyInterval:
                  s !== null ? Interval[s as keyof typeof Interval] : undefined,
              })
            }
          />
        </Col>
        <Col md={5}>
          <Dropdown
            options={Object.keys(Month)}
            initialSelected={earlyMonth}
            placeholder="Month"
            // className="filterform-short-dropdown"
            isValid={validations?.earlyMonth?.success}
            error={validations?.earlyMonth?.error}
            onSelect={(s) =>
              setStore({
                earlyMonth:
                  s !== null ? Month[s as keyof typeof Month] : undefined,
              })
            }
          />
        </Col>
      </Form.Row>
      <Form.Row className="m-2">
        <Col md={2}>
          <Form.Label className="post-word my-2">To</Form.Label>
        </Col>
        <Col md={5}>
          <Dropdown
            options={Object.keys(Interval)}
            initialSelected={lateInterval}
            placeholder="Date"
            // className="filterform-short-dropdown"
            isValid={validations?.lateInterval?.success}
            error={validations?.lateInterval?.error}
            onSelect={(s) =>
              setStore({
                lateInterval:
                  s !== null ? Interval[s as keyof typeof Interval] : undefined,
              })
            }
          />
        </Col>
        <Col md={5}>
          <Dropdown
            options={Object.keys(Month)}
            initialSelected={lateMonth}
            placeholder="Month"
            // className="filterform-short-dropdown"
            isValid={validations?.lateMonth?.success}
            error={validations?.lateMonth?.error}
            onSelect={(s) =>
              setStore({
                lateMonth:
                  s !== null ? Month[s as keyof typeof Month] : undefined,
              })
            }
          />
        </Col>
      </Form.Row>

      <Form.Row className="m-2">
        <Col md={12}>
          <Dropdown
            options={[
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12',
            ]}
            initialSelected={stayPeriod?.toString()}
            // className="filterform-short-dropdown"
            label="Stay Period"
            isValid={validations?.stayPeriod?.success}
            error={validations?.stayPeriod?.error}
            onSelect={(s, e) =>
              setStore({ stayPeriod: s !== null ? parseInt(s) : undefined })
            }
            inlineText="Months"
            required
          />
        </Col>
      </Form.Row>

      <Row className="mt-5">
        <Col>
          <div className="post-title">Price</div>
        </Col>
      </Row>

      <Form.Row className="m-2">
        <Col md={12}>
          <Input
            value={price}
            type="number"
            onChange={(e) =>
              setStore({
                price: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
            className="mb-2"
            label="Rent"
            inlinePostText="USD/Month"
            isValid={validations?.price?.success}
            isInvalid={validations?.price && !validations?.price?.success}
            error={validations?.price?.error}
            required
          />
        </Col>
      </Form.Row>
    </Container>
  );
};

export default Page2 as React.FC;
