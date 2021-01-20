import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { HousePost } from '../assets/models/PostModels';
import HouseProfile from './HouseProfile';

// change this to PathProps extends HousePost {} to include other props
export type PathProps = HousePost;

const Bookmark: React.FC<PathProps> = (props) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <HouseProfile show={show} onHide={() => setShow(false)} {...props} />

      <Button variant="no-show" className="w-100" onClick={() => setShow(true)}>
        <div className="bookmark">
          <div>
            <img // TODO change this to be a carousel (first need to update the carousel)
              src={`https://houseit.s3.us-east-2.amazonaws.com/${props.photos[0]}`}
              alt="First slide"
            />
          </div>
          <div className="bookmark-info align-self-center">
            <Row>{props.leaserName}</Row>
            <Row>{props.leaserPhone}</Row>
            <Row>{props.leaserEmail}</Row>
          </div>
        </div>
      </Button>
    </>
  );
};

export default Bookmark;
