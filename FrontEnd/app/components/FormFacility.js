import React from "react";
const facilitiesInfo = [
  {
    type: "washer",
    name: " Indoor Washer"
  },
  {
    type: "patio",
    name: " Patio/Balcony"
  },
  {
    type: "fridge",
    name: " Refrigerator"
  },
  {
    type: "oven",
    name: " Oven"
  },
  {
    type: "microwave",
    name: " Microwave"
  },
  {
    type: "ac",
    name: " Air Conditioning"
  },
  {
    type: "pool",
    name: " Pool"
  },
  {
    type: "SPA", // why is spa capitalized?
    name: " SPA"
  },
  {
    type: "gym",
    name: " Gym"
  },
  {
    type: "elevator",
    name: " Elevator"
  },
  {
    type: "hardwood",
    name: " Hardwood floor"
  }
];
export default class FormFacility extends React.Component {
  state = { bulk: this.props.bulk };
  render() {
    return (
      <li style={{ background: "#FAFAF4" }}>
        Required Facilities:
        <input
          type="checkbox"
          id="all"
          name="all"
          value={this.state.bulk.all}
          checked={this.state.bulk.all === "yes"}
          onChange={this.props.handleAll}
        />
        <label htmlFor="all"> All</label>
        {facilitiesInfo.map(obj => (
          <React.Fragment key={obj.type}>
            <input
              type="checkbox"
              id={obj.type}
              name={obj.type}
              value={this.state.bulk[obj.type]}
              checked={this.state.bulk[obj.type] === "yes"}
              onChange={this.props.handleChange}
            />
            <label htmlFor={obj.type}> {obj.name} </label>
            <br />
          </React.Fragment>
        ))}
      </li>
    );
  }
}
