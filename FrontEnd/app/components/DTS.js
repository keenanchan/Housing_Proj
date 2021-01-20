// distance to skoo
import React from "react";
import { options_transportation, options_time } from "./options";
export default function DTS() {
  return (
    <div className="row">
      <div
        className="col"
        style={{ float: "left", display: "flex", "flex-wrap": "wrap" }}
      >
        Time(min)
        {options_time.map(({ name }, index) => {
          console.log(name);
          return (
            <div key={index}>
              <input type="radio" id="name" name="name" value={name} />
              <label for={name}> {name}</label>
            </div>
          );
        })}
      </div>
      <img src="./app/resources/divider.svg" />
      <div
        className="col"
        style={{ float: "left", display: "flex", "flex-wrap": "wrap" }}
      >
        Type of Transportation
        {options_transportation.map(({ name }, index) => {
          console.log(name);
          return (
            <div key={index}>
              <input type="radio" id="tran" name="tran" value={name} />
              <label for={name}> {name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
