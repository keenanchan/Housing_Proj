import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { filterIcons } from '../assets/icons/all';
import { setShow } from '../redux/slices/filter';

const HouseNotFound: React.FC = () => {
  const dispatch = useDispatch();
  const setShowFilter = (value: boolean) => dispatch(setShow(value));

  return (
    <Container>
      <Row className="justify-content-center">
        <filterIcons.notFound />
      </Row>
      <Row className="justify-content-center">
        <p className="displayText">
          Oops, it looks like nothing fits your criteria...
        </p>
      </Row>
      <Row className="justify-content-center">
        <p className="displayText">Edit your Criteria & Try again !</p>
      </Row>
      <Row className="justify-content-center">
        <Button onClick={() => setShowFilter(true)}>Edit Criteria</Button>
      </Row>
    </Container>
  );
};

export default HouseNotFound;
