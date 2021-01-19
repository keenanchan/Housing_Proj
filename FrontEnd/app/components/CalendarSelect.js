import React, { Component } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
export default class CalendarSelect extends Component {
  state = {
    date: [new Date(), new Date()]
  };

  onChange = date => this.setState({ date }, () => console.log(date));

  render() {
    return (
      <div>
        <Calendar
          returnValue="range"
          selectRange
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}
