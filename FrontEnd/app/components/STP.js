// stay period
import React from "react";
import { options_lease_short, options_interval } from "./options";
export default function STP() {
  return (
    <div className="col">
      <div
        className="col"
        style={{ float: "left", display: "flex", "flex-wrap": "wrap" }}
      >
        {options_lease_short.map(({ name }, index) => {
          return (
            <div key={index}>
              <input type="radio" id="name" name="name" value={name} />
              <label for={name}> {name}</label>
            </div>
          );
        })}
      </div>
      <img src="./app/resources/horizontal_div.svg" />
      <div className="row" style={{ display: "flex", "flex-wrap": "wrap" }}>
        <div className="col" style={{ width: "30%" }}>
          <input type="number" min="0" step="1" placeholder="Enter #" />
        </div>
        <div className="col">
          {options_interval.map(({ name }, index) => {
            return (
              <div key={index}>
                <input
                  type="radio"
                  id="time_interval"
                  name="time_interval"
                  value={name}
                />
                <label for={name}> {name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
