import React from "react";
import Slider from "rc-slider";
import CalendarSelect from "./CalendarSelect";
import DTS from "./DTS";
import RMT from "./RMT";
import STP from "./STP";

export function toggleShow(name) {
  console.log("hehe");
  document.getElementById(name).classList.toggle("show");
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  // remove other dropdowns
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.id !== name && openDropdown.classList.contains("show")) {
      openDropdown.classList.remove("show");
    }
  }
}

export default function Drop({ name }) {
  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);
  var component;
  if (name === "Distance to School") {
    component = (
      <div id={name} className="dropdown-content">
        <DTS />
      </div>
    );
  } else if (name === "Room Type") {
    component = (
      <div id={name} className="dropdown-content">
        <RMT />
      </div>
    );
  } else if (name === "Price Range") {
    component = (
      <div id={name} className="dropdown-content">
        <Range
          style={{ width: "200px" }}
          min={0}
          max={10000}
          marks={{
            1000: 1000,
            2500: 2500,
            5000: 5000,
            7500: 7500,
            10000: 10000
          }}
          tipFormatter={value => `${value}`}
        />
      </div>
    );
  } else if (name === "Move in Time") {
    component = (
      <div id={name} className="dropdown-content">
        <CalendarSelect style={{ width: "200px" }} />
      </div>
    );
  } else if (name === "Stay Period") {
    component = (
      <div id={name} className="dropdown-content">
        <STP />
      </div>
    );
  }

  return (
    <div className="dropdown">
      <button className="dropbtn">
        {name}
        <img
          onClick={() => toggleShow(name)}
          src="./app/resources/down.png"
          alt="down"
        />
      </button>
      {component}
    </div>
  );
}
