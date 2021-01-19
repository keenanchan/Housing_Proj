import React from "react";
import DropDown from "./DropDown";
import ThemeContext from "../contexts/theme";
import TenantCard from "./TenantCard";
import { NavLink } from "react-router-dom";

export default class People extends React.Component {
  static contextType = ThemeContext;
  constructor(props) {
    super(props);
    this.state = { post: [] };
  }

  componentDidMount() {
    fetch("http://localhost:3001/getPeople", {
      mode: "cors"
    })
      .then(res => res.json())
      .then(data => this.setState({ post: data }));
  }

  componentDidUpdate() {
    if (this.props.location.update) {
      fetch("http://localhost:3001/getPeople", {
        mode: "cors"
      })
        .then(res => res.json())
        .then(data => this.setState({ post: data }))
        .then((this.props.location.update = false))
        .then(console.log("debugging update"));
    }
  }

  render() {
    const user = this.context;
    var pathname = user.login ? "/hosting_form" : "/login";
    return (
      <>
        <DropDown />
        <ul style={{ float: "left", display: "flex", "flex-wrap": "wrap" }}>
          {this.state.post.map(person_info => {
            const {
              move_time,
              stay_period,
              timetoschool,
              timetobus,
              r_type,
              price_range,
              name,
              others,
              intro,
              id,
              main_pic,
              email
            } = person_info;
            return (
              <li key={id}>
                <TenantCard
                  move_time={move_time}
                  stay_period={stay_period}
                  timetoschool={timetoschool}
                  timetobus={timetobus}
                  r_type={r_type}
                  price_range={price_range}
                  name={name}
                  others={others}
                  intro={intro}
                  main_pic={main_pic}
                  email={email}
                />
              </li>
            );
          })}
        </ul>
        <NavLink
          to={{
            pathname: pathname,
            endpoint: "http://localhost:3001/addtenant"
          }}
          style={{
            position: "fixed",
            bottom: 0,
            right: 0
          }}
        >
          <img
            src="./app/resources/add_post.svg"
            alt="form"
            width="52px"
            height="52px"
          />
        </NavLink>
      </>
    );
  }
}
