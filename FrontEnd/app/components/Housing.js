import React from "react";
import DropDown from "./DropDown";
import RoomCard from "./RoomCard";
import ThemeContext from "../contexts/theme";
import { FaRegCalendarTimes } from "react-icons/fa";
import { IoIosPricetag } from "react-icons/io";
import { GiSandsOfTime } from "react-icons/gi";
import { NavLink } from "react-router-dom";

export default class Housing extends React.Component {
  static contextType = ThemeContext;
  constructor(props) {
    super(props);

    this.state = { post: [] };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3001/getRoom", {
      mode: "cors"
    })
      .then(res => res.json())
      .then(data => this.setState({ post: data }));
  }

  componentDidUpdate() {
    if (this.props.location.update) {
      fetch("http://localhost:3001/getRoom", {
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
        <ul>
          {this.state.post.map(house_info => {
            const {
              name,
              intro,
              main_pic,
              price_range,
              stay_period,
              move_time,
              id
            } = house_info;
            return (
              <li key={name}>
                <RoomCard header={id} name={name} intro={intro} pic={main_pic}>
                  <ul className="row space-between cardname">
                    <li>
                      <div className="col subitem">
                        <span>
                          <IoIosPricetag color="rgb(255, 215, 0)" size={22} />
                          Price Range
                        </span>
                        <span>{price_range}</span>
                      </div>
                    </li>
                    <li>
                      <div className="col subitem">
                        <span>
                          <GiSandsOfTime color="rgb(129, 195, 245)" size={22} />{" "}
                          Stay in Period
                        </span>
                        <span>{stay_period}</span>
                      </div>
                    </li>
                    <li>
                      <div className="col subitem">
                        <span>
                          <FaRegCalendarTimes
                            color="rgb(241, 138, 147)"
                            size={22}
                          />{" "}
                          Move in Time{" "}
                        </span>
                        <span>{move_time}</span>
                      </div>
                    </li>
                  </ul>
                </RoomCard>
              </li>
            );
          })}
        </ul>
        <NavLink
          to={{
            pathname: pathname,
            endpoint: "http://localhost:3001/result"
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
