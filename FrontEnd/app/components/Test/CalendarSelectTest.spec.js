import React from "react";
import { create } from "react-test-renderer";
import Calendar from "react-calendar";
import CalendarSelect from "../CalendarSelect";

/**
 * Test Cases for the component CalendarSelectTest.js
 * Contains three tests (expects an array for return value):
 * 1. select same dates today
 * 2. select same dates non-today
 * 3. select different dates
 * Assumptions: onChange takes in an array of length 2
 * sorted chronologically (done by library).
 * The reason for it is still unclear since this test only
 * contains Array(len == 2) of Date objects.
 *
 */

describe("Check default values", () => {
  test("Same Dates Today", () => {
    const component = create(<CalendarSelect />);
    const instance = component.root;
    const calendar = instance.findByType(Calendar);
    expect(calendar.props.value).toBe(instance.instance.state.date);
  });
});

describe("Check if two dates are updated correctly", () => {
  test("Same Dates Today", () => {
    const date1 = new Date();
    const date2 = new Date();
    const day_range = [date1, date2];
    const component = create(<CalendarSelect />);
    const instance = component.root;
    const calendar = instance.findByType(Calendar);
    calendar.props.onChange(day_range);
    expect(calendar.props.value).toBe(day_range);
  });
});

describe("Check random two dates", () => {
  test("Random Dates", () => {
    const date1 = new Date(2017, 0, 1);
    const date2 = new Date(2018, 0, 1);
    const day_range = [date1, date2];
    const component = create(<CalendarSelect />);
    const instance = component.root;
    const calendar = instance.findByType(Calendar);
    calendar.props.onChange(day_range);
    expect(calendar.props.value).toBe(day_range);
  });
});

describe("Check if two dates are updated correctly", () => {
  test("Same Dates non-today", () => {
    const date1 = new Date(2017, 0, 1);
    const date2 = new Date(2017, 0, 1);
    const day_range = [date1, date2];
    const component = create(<CalendarSelect />);
    const instance = component.root;
    const calendar = instance.findByType(Calendar);
    calendar.props.onChange(day_range);
    expect(calendar.props.value).toBe(day_range);
  });
});
