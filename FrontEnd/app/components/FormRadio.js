import React from "react";

const radioInfo = [
  {
    name: "Price Negotiable:",
    type: "negotiable",
    background: true
  },
  {
    name: "Utilities included:",
    type: "utility",
    background: false
  },
  {
    name: "Private Bathroom:",
    type: "private",
    background: true
  }
];

export default class FormRadio extends React.Component {
  state = { bulk: this.props.bulk };

  render() {
    return radioInfo.map((obj, i) => (
      <li style={obj.background ? { background: "#FAFAF4" } : null} key={i}>
        {" "}
        {/*make sure this works*/}
        {obj.name}
        <input
          type="radio"
          name={obj.type}
          id={`${obj.type}_yes`}
          value="yes"
          checked={this.state.bulk[obj.type] === "yes"}
          onChange={this.props.handleChange}
          required
        />{" "}
        Yes
        <input
          type="radio"
          name={obj.type}
          id={`${obj.type}_no`}
          value="no"
          checked={this.state.bulk[obj.type] === "no"}
          onChange={this.props.handleChange}
        />{" "}
        No
      </li>
    ));
  }
}
