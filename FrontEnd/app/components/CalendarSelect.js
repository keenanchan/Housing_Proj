import React, { Component } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
export default class CalendarSelect extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      dates: [new Date(),new Date()],
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange = (dates) => this.setState({ dates: dates.map((date) => new Date(date)) },
    () => console.log(this.state))

  render() {
    return (
      <div>
        <Calendar
          returnValue = {"range"}
          selectRange = {true}
          onChange={this.onChange}
          value={this.state.dates}
        />
      </div>
    );
  }
}