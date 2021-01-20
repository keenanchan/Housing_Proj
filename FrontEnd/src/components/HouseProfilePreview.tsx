// TODO this is currently unused
import React from 'react';
import Button from 'react-bootstrap/Button';
import HouseProfile, { HouseProfileProps } from './HouseProfile';

interface HouseProfilePreviewProps extends HouseProfileProps {
  onSubmit: () => any;
}

const HouseProfilePreview: React.FC<HouseProfilePreviewProps> = ({
  show,
  onHide,
  onSubmit,
  ...houseProfileProps
}) => (
  <div>
    {show && (
      <div>
        <Button>First</Button>
        <Button>Second</Button>
      </div>
    )}
    <HouseProfile show={show} onHide={onHide} {...houseProfileProps} />
  </div>
);

export default HouseProfilePreview;
