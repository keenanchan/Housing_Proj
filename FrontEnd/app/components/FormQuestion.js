import React from "react";
const questionInfo = [
  {
    background: true,
    question: "Do you mind if other tenants are in the living room?",
    name: "living"
  },
  {
    background: false,
    question: "Do you have pets?",
    name: "pets"
  },
  {
    background: true,
    question: "Parking:",
    name: "parking"
  },
  {
    background: false,
    question: "Furnished:",
    name: "furnished"
  }
];
export default class FormQuestion extends React.Component {
  state = { bulk: this.props.bulk };
  render() {
    return questionInfo.map((obj, i) => (
      <li style={obj.background ? { background: "#FAFAF4" } : null} key={i}>
        {obj.question}
        <input
          type="radio"
          name={obj.name}
          id={`${obj.name}_yes`}
          value="yes"
          checked={this.state.bulk[obj.name] === "yes"}
          onChange={this.props.handleChange}
          required
        />{" "}
        Yes
        <input
          type="radio"
          name={obj.name}
          id={`${obj.name}_no`}
          value="no"
          checked={this.state.bulk[obj.name] === "no"}
          onChange={this.props.handleChange}
        />{" "}
        No
      </li>
    ));
  }
}
