import React from "react";
import { NavLink } from "react-router-dom";

export default function RoomCard({ name, intro, pic, children, header }) {
  return (
    <div className="bg-card">
      <img className="pic" src={pic} alt={`Pic for ${name}`} />
      <div className="col">
        <h2 className="cardname">
          <NavLink
            to={{
              pathname: "/details",
              search: `?Room=${header}`
            }}
            exact
          >
            {name}
          </NavLink>
        </h2>
        <div className="cardname">{intro}</div>
        {children}
      </div>
    </div>
  );
}
