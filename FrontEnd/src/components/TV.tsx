import React from 'react';

const NewTV: React.FC = ({ children }) => (
  <div className="tv-container">
    <div className="tv-buttons-div">
      <div className="tv-title">Hello</div>
      <div className="tv-separator" />

      {children}
    </div>

    <div className="tv-bottom">
      <div className="tv-bottom-bar" />
      <div className="tv-bottom-circle" />
    </div>
  </div>
);

export default NewTV;
