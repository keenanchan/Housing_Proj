import React from 'react';

const NewTV: React.FC = ({ children }) => (
  <div className="tv-container">
    <div className="tv-buttons-div">{children}</div>

    <div className="d-flex justify-content-around m-3">
      <div className="tv-bottom-bar" />
      <div className="tv-bottom-circle" />
    </div>
  </div>
);

export default NewTV;
