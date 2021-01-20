import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import { loading } from '../assets/icons/all';
import HouseNotFound from './HouseNotFound';
import HouseCard from './HouseCard';
import {
  getHousingPosts,
  selectHousingPosts,
  selectHousingSearchMode,
  SearchingMode,
} from '../redux/slices/housing';

const HouseCardList: React.FC = () => {
  const cards = useSelector(selectHousingPosts);
  const searchMode = useSelector(selectHousingSearchMode);
  const dispatch = useDispatch();
  useEffect(() => {
    // api call to get the housing card info
    dispatch(getHousingPosts());
  }, [dispatch]);
  return (
    <Container fluid>
      <Row>
        {cards && cards.length > 0 ? ( // TODO this should be handled within the loader component (not yet made)
          cards.map((card) => (
            <Col
              xs={12}
              md={10}
              lg={6}
              key={JSON.stringify(card)}
              className="mb-5"
            >
              <HouseCard
                name={card.name}
                pricePerMonth={card.pricePerMonth}
                roomType={card.roomType}
                early={card.early}
                late={card.late}
                distance={card.distance}
                location={card.location}
                photos={card.photos}
                profilePhoto={card.profilePhoto}
                stayPeriod={card.stayPeriod}
                leaserName={card.leaserName}
                leaserSchoolYear={card.leaserSchoolYear}
                leaserMajor={card.leaserMajor}
                roomDescription={card.roomDescription}
                leaserEmail={card.leaserEmail}
                leaserPhone={card.leaserPhone}
                roomId={card.roomId}
                other={card.other}
                facilities={card.facilities}
                negotiable={card.negotiable}
                numBaths={card.numBaths}
                numBeds={card.numBeds}
              />
            </Col>
          ))
        ) : searchMode === SearchingMode.FINISHED ? (
          <HouseNotFound />
        ) : (
          <img className="w-100 h-100" src={loading.loading} alt="loading..." />
        )}
      </Row>
    </Container>
  );
};

export default HouseCardList;
