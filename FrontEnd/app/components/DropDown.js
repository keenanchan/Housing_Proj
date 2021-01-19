import React from "react";
import Drop from "./Drop";

export default function DropDown() {
  return (
    <div className="row space-between">
      <Drop name="Distance to School" />
      <Drop name="Room Type" />
      <Drop name="Price Range" />
      <Drop name="Move in Time" />
      <Drop name="Stay Period" />
    </div>
  );
}
