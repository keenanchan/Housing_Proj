import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useCookies } from 'react-cookie';
import GoogleMap from './GoogleMap';
import PreviewSlideShow, { testSlideShow } from './PreviewSlideShow';
import { contactIcons, miscIcons, facilityIcons } from '../assets/icons/all';

const Ellipse: React.FC<{}> = () => (
  <Row className="justify-content-center">
    <miscIcons.ellipse className="m-3" />
    <miscIcons.ellipse className="m-3" />
    <miscIcons.ellipse className="m-3" />
  </Row>
);

export const facilityToIcon = {
  Parking: <facilityIcons.parking />,
  Elevator: <facilityIcons.elevator />,
  'Gym room': <facilityIcons.gym />,
  'Swimming pool': <facilityIcons.swimmingPool />,
  'Pets friendly': <facilityIcons.petsFriendly />,
  'Indoor washer': <facilityIcons.indoorWasher />,
};

const GetIcon: React.FC<{ str: keyof typeof facilityToIcon }> = ({ str }) => (
  <div className="mt-2">{facilityToIcon[str]}</div>
);

interface PathProps {
  houseName: string;
  pricePerMonth: number;
  roomType: string;
  moveIn: string;
  stayPeriod: number;
  facilities: (keyof typeof facilityToIcon)[];
  lookingFor: string[];
  distance: string;
  address: string;
  bioName: string;
  bioYear: number;
  bioMajor: string;
  email: string;
  phone: string;
  bioProfilePic: string;
  bioDescription: string;
  show: boolean;
  setShow: (show: boolean) => void;
}

const HouseProfile: React.FC<PathProps> = ({
  houseName,
  pricePerMonth,
  roomType,
  moveIn,
  stayPeriod,
  facilities,
  lookingFor,
  distance,
  address,
  bioName,
  bioYear,
  bioMajor,
  email,
  phone,
  bioProfilePic,
  bioDescription,
  show,
  setShow,
}) => {
  const [cookies, setCookie] = useCookies(['liked']);

  const onClick = () => {
    // note this should be going through backend. I've done it through cookies right now,
    // but trying to serialise even one houseProfileObj makes the cookie too big... -Keenan
    const houseProfileObj = {
      // houseType: houseType,
      // pricePerMonth: pricePerMonth,
      // roomType: roomType,
      // moveIn: moveIn,
      // stayPeriod: stayPeriod,
      // facilities: facilities,
      // lookingFor: lookingFor,
      // distance: distance,
      // address: address,
      bioName,
      // bioYear: bioYear,
      // bioMajor: bioMajor,
      email,
      phone,
      // bioProfilePic: bioProfilePic,
      // bioDescription: bioDescription,
    };

    if (cookies.liked === undefined) {
      var payload = JSON.stringify([houseProfileObj]);
      setCookie('liked', payload, { path: '/', httpOnly: false, maxAge: 120 });
      // console.log(cookies.liked);
    } else {
      var payload = JSON.stringify([...cookies.liked, houseProfileObj]);
      setCookie('liked', payload, { path: '/', httpOnly: false, maxAge: 120 });
      // console.log(cookies.liked);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="xl"
      centered
      className="house-profile-modal"
    >
      <Container className="p-0">
        <Row>
          {/* first column */}
          <Col sm={12} lg={5}>
            <PreviewSlideShow
              items={testSlideShow}
              className="house-profile-preview-slideshow"
            />
          </Col>

          {/* second column */}
          <Col sm={12} md={6} lg={4}>
            <Container className="mt-3 mt-lg-5 mt-md-4 mx-3 mx-lg-0">
              <Row className="justify-content-center">
                <span className="housing-profile-house-type">{houseName}</span>
              </Row>

              <Row>
                <Col className="housing-profile-price" md={5}>
                  <Row>${pricePerMonth}</Row>
                </Col>
                <Col md={{ span: 5, offset: 2 }}>
                  <Row>Room type</Row>
                  <Row>
                    <h4>
                      <b>{roomType}</b>
                    </h4>
                  </Row>
                </Col>
              </Row>

              <Row className="justify-content-center">
                <Col md={5}>
                  <Row>Move in time</Row>
                  <Row>
                    <h4>
                      <b>{moveIn}</b>
                    </h4>
                  </Row>
                </Col>

                <Col md={{ span: 5, offset: 2 }}>
                  <Row>Stay period</Row>
                  <Row>
                    <h4>
                      <b>{stayPeriod}</b>
                    </h4>
                  </Row>
                </Col>
              </Row>

              <Ellipse />

              <Row>Facilities</Row>
              <Row>
                {facilities.map((facility) => (
                  <Col xs={{ span: 3, offset: 1 }} className="text-center">
                    <GetIcon str={facility} />
                    {facility}
                  </Col>
                ))}
              </Row>

              <Ellipse />

              <Row>Looking for</Row>
              <ul>
                {lookingFor.map((description) => (
                  <li>{description}</li>
                ))}
              </ul>
            </Container>
          </Col>

          {/* third column */}
          <Col
            sm={12}
            md={6}
            lg={3}
            className="d-flex flex-column mt-lg-5 mt-md-4"
          >
            <div className="px-3 pl-lg-1">
              <Button className="w-90">Add to my list!</Button>

              <div className="text-primary">
                <b>{distance} miles from school</b>
              </div>
              <div>{address}</div>
              <GoogleMap />
            </div>

            <Container className="housing-profile-bio">
              <Row>
                <Col md={8} className="text-center">
                  <div>
                    <b>{bioName}</b>
                  </div>

                  <div>
                    {bioYear} | {bioMajor}
                  </div>

                  <Row className="justify-content-center">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip id="tooltip">{email}</Tooltip>}
                    >
                      <contactIcons.email
                        className="d-block mr-3"
                        onClick={async () => {
                          await navigator.clipboard.writeText(email);
                          window.open(`mailto:${email}`, '_blank');
                        }}
                      />
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip id="tooltip">{phone}</Tooltip>}
                    >
                      <contactIcons.phone
                        className="d-block mr-3"
                        onClick={async () => {
                          await navigator.clipboard.writeText(phone);
                          window.open(`tel:${phone}`, '_blank');
                        }}
                      />
                    </OverlayTrigger>
                  </Row>
                </Col>

                <Col md={4} className="mt-auto text-center">
                  <Image src={bioProfilePic} roundedCircle fluid />
                </Col>
              </Row>

              <div className="housing-profile-speech-bubble">
                {bioDescription}
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export default HouseProfile;
