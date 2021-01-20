import React from "react";
import GoogleAuth from "./GoogleAuth";

export default class Login extends React.Component {
  render() {
    return (
      <div className="row-main">
        <div className="left_login_container" />
        <div className="right_container col flex-center">
          <img
            src="./app/resources/login_divider.svg"
            alt="divider"
            style={{ width: "90%" }}
          />
          <ul className="col nonflex-center">
            <li>
              <img
                src="./app/resources/icons_google.svg"
                alt="icon"
                style={{ width: "80%", height: "10%", marginTop: "35px" }}
              />
            </li>
            <li>
              <GoogleAuth />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
