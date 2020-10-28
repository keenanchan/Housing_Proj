import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HouseCard from './HouseCard';
import {
  updateHousingPosts,
  selectingHousingPosts,
} from '../redux/slices/housing';
import { useSelector, useDispatch } from 'react-redux';

const HousingList: React.FC = () => {
  const housingPosts = useSelector(selectingHousingPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateHousingPosts());
  }, []);

  return (
    <Container fluid>
      <Row>
        {housingPosts ? (
          housingPosts.map((post) => (
            <Col xs={12} md={6} className="mb-5">
              <HouseCard {...post} />
            </Col>
          ))
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
};

export default HousingList;
