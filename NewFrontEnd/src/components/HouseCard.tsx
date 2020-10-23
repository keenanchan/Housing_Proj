import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SlideShow from './SlideShow';
import HouseProfile, { facilityToIcon } from './HouseProfile';

// Path Props need to be exactly the same from backend response
// TODO: extract common interface between HouseCard and HouseProfile
export interface PathProps {
  name: string;
  location: string;
  distance: string;
  pricePerMonth: number;
  stayPeriod: number;
  early: string;
  late: string;
  roomType: string;
  leaserName: string;
  leaserEmail: string;
  leaserPhone: string;
  leaserSchoolYear: number;
  leaserMajor: string;
  leaserIntro: string;
  photo: string[];
  profilePhoto: string;
  other: string[];
  facilities: (keyof typeof facilityToIcon)[];
}

const HouseCard: React.FC<PathProps> = ({
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
}) => {
  const [show, setShow] = useState<boolean>(false);
  const moveIn = early + '-' + late;
  const SlideShowContent = photo.map((link) => ({
    src: 'https://houseit.s3.us-east-2.amazonaws.com/' + link,
    alt: leaserName + ' , ' + location,
  }));
  return (
    <>
      <HouseProfile
        pricePerMonth={pricePerMonth}
        roomType={roomType}
        moveIn={moveIn}
        distance={distance}
        address={location}
        houseName={name}
        stayPeriod={stayPeriod}
        facilities={facilities}
        lookingFor={other}
        bioName={leaserName}
        bioYear={leaserSchoolYear}
        bioMajor={leaserMajor}
        email={leaserEmail}
        phone={leaserPhone}
        bioProfilePic={profilePhoto}
        bioDescription={leaserIntro}
        show={show}
        setShow={setShow}
      />
      {/* first column */}
      <Card border="secondary" className="house-card">
        <Card.Body>
          <Container>
            <Row className="house-pic">
              <SlideShow
                images={SlideShowContent}
                onImageClick={() => setShow(true)}
              ></SlideShow>
            </Row>
            <Row>
              <Col md={5} className="house-card-left house-card-price">
                <Row>${pricePerMonth}</Row>
              </Col>
              <Col md={7} className="house-card-right house-card-right-top">
                <Row>
                  <div className="w-100 text-right">
                    {roomType} <span className="divider">|</span> Move In{' '}
                    {moveIn}
                  </div>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={5} className="house-card-left house-card-left-bottom">
                <Row>{distance}</Row>
              </Col>

              <Col md={7} className="house-card-right">
                <Row>
                  <div className="w-100 text-right">{location}</div>
                </Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default HouseCard;
