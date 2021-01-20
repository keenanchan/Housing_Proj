import React from "react";
const preferenceInfo = [
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
    type: "LGBTQ",
    name: " LGBTQ",
    required: false
  },
  {
    type: "Gender Inclusive",
    name: " Gender Inclusive",
    required: false
  },
  {
    type: "others",
    name: " Others",
    required: false
  }
];

export default class FormPreference extends React.Component {
  state = { bulk: this.props.bulk };
  render() {
    return preferenceInfo.map((obj, i) => (
      <React.Fragment key={i}>
        <input
          type="radio"
          name="gender"
          id={obj.type}
          value={obj.type}
          checked={this.state.bulk.gender === obj.type}
          onChange={this.props.handleChange}
          required={obj.required}
        />
        {obj.name}
      </React.Fragment>
    ));
  }
}
