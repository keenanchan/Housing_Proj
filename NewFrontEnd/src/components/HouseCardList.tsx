import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HouseCard, { PathProps } from './HouseCard';
import { getHousingFake } from '../apis/mocks/housing';

const HousingList: React.FC = () => {
  const [cards, setCards] = useState<PathProps[]>([]);
  useEffect(() => {
    // fake the api call to get the housing card info
    getHousingFake().then((response) => {
      setCards(
        response
          ? response.map((room) => ({
              name: room['name'],
              pricePerMonth: room['pricePerMonth'],
              roomType: room['roomType'],
              early: room['early'],
              late: room['late'],
              distance: room['distance'],
              location: room['location'],
              photo: room['photo'],
              profilePhoto: room['profilePhoto'],
              stayPeriod: room['stayPeriod'],
              leaserName: room['leaserName'],
              leaserSchoolYear: room['leaserSchoolYear'],
              leaserMajor: room['leaserMajor'],
              leaserIntro: room['leaserIntro'],
              leaserEmail: room['leaserEmail'],
              leaserPhone: room['leaserPhone'],
              other: room['other'],
              facilities: room['facilities'],
            }))
          : [],
      );
    });
  }, []);

  return (
    <Container fluid>
      <Row>
        {cards.map(
          ({
            name,
            pricePerMonth,
            roomType,
            early,
            late,
            distance,
            location,
            photo,
            profilePhoto,
            stayPeriod,
            leaserName,
            leaserSchoolYear,
            leaserMajor,
            leaserIntro,
            leaserEmail,
            leaserPhone,
            other,
            facilities,
          }) => (
            <Col xs={12} md={6} className="mb-5">
              <HouseCard
                name={name}
                pricePerMonth={pricePerMonth}
                roomType={roomType}
                early={early}
                late={late}
                distance={distance}
                location={location}
                photo={photo}
                profilePhoto={profilePhoto}
                stayPeriod={stayPeriod}
                leaserName={leaserName}
                leaserSchoolYear={leaserSchoolYear}
                leaserMajor={leaserMajor}
                leaserIntro={leaserIntro}
                leaserEmail={leaserEmail}
                leaserPhone={leaserPhone}
                other={other}
                facilities={facilities}
              />
            </Col>
          ),
        )}
      </Row>
    </Container>
  );
};

export default HousingList;
