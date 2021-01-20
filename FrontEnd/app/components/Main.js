import React from "react";
import { NavLink } from "react-router-dom";

export default class Main extends React.Component {
  render() {
    return (
      <div className="row-main main_container">
        <div className="left_container" />
        <div className="right_container flex-center col">
          <img src="./app/resources/search.png" alt="search" />
          <ul className="col nav">
            <li>
              <NavLink to="/housing" exact className="nav-link">
                <img src="./app/resources/house.png" alt="house" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/tenant" className="nav-link">
                <img src="./app/resources/tenant.png" alt="tenant" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
