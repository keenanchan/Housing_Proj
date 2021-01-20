import React from "react";

const hostGenderInfo = [
  {
    type: "female",
    name: " Female",
    required: true
  },
  {
    type: "male",
    name: " Male",
    required: false
  },
  {
    type: "LGBTQ", // LGBTQ isn't a gender lmao
    name: " LGBTQ",
    required: false
  },
  {
    type: "other_gender",
    name: " Other",
    required: false
  }
];

export default class FormHostGender extends React.Component {
  state = {bulk: this.props.bulk};
  render() {
    return (
      hostGenderInfo.map((obj, i) => (
        <React.Fragment key={i}>
          <input
            type="radio"
            name="host_gender"
            value={obj.type}
            id={`${obj.type}_host`} // collision w/ prefernce w/o prefix
            checked={this.state.bulk.host_gender === obj.type}
            onChange={this.props.handleChange}
            required
          />
          {obj.name}
        </React.Fragment>
      ))
    )
  }
}
