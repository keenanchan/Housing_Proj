import React from "react";
import Select from "react-dropdown-select";

import {
  options_transportation,
  options_time,
  options_number
} from "./options";

const styles = {
  transportation: {
    width: "135px",
    minHeight: "13px",
    height: "20px"
  }
};

const transportationInfo = [
  {
    name: "Type of Transportation",
    options: options_transportation,
    type: "transportation",
    required: true
  },
  {
    name: "Number of Buses (if applicable)",
    options: options_number,
    type: "bus_cnt",
    required: false
  },
  {
    name: "Type",
    options: options_time,
    type: "time",
    required: true
  }
];
export default class FormTransportation extends React.Component {
  state = { bulk: this.props.bulk };
  render() {
    return transportationInfo.map((obj, i) => (
      <div key={i}>
        {" "}
        {obj.name}
        <Select
          id={obj.type}
          style={styles.transportation}
          options={obj.options}
          placeholder="selected ...."
          labelField="name"
          valueField={this.state.bulk[obj.type] || ""}
          onChange={val => this.props.handleDrop(obj.type, val)}
          required={obj.required}
        />
      </div>
    ));
  }
}
