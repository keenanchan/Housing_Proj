import { Redirect } from "react-router-dom";
import Select from "react-dropdown-select";
import React from "react";
import Slider from "rc-slider";
import {
  options_transportation,
  options_time,
  options_number,
  options_lease,
  options_months,
  options_timecategories
} from "./options";
import "rc-tooltip/assets/bootstrap.css";
import "rc-slider/assets/index.css";
import ImageUploader from "react-images-upload";
import Map from "./Map";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const facilityArr = [
  "washer",
  "patio",
  "fridge",
  "microwave",
  "oven",
  "ac",
  "pool",
  "SPA",
  "gym",
  "elevator",
  "hardwood"
];
const styles = {
  hidden: {
    display: "none"
  },
  transportation: {
    width: "135px",
    "min-height": "13px",
    height: "20px"
  },
  roomCount: {
    width: "135px",
    "min-height": "13px",
    height: "13px",
    marginLeft: "200px",
    marginRight: "10px"
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
const roomCountInfo = [
  {
    type: "bedroom",
    name: "Bedroom"
  },
  {
    type: "bathroom",
    name: "Bathroom"
  }
];
const roomTypeInfo = [
  {
    type: "master",
    name: "Master"
  },
  {
    type: "guest",
    name: "Guest"
  },
  {
    type: "single",
    name: "Single"
  },
  {
    type: "double",
    name: "Double"
  },
  {
    type: "triple",
    name: "Triple"
  },
  {
    type: "living_room",
    name: "Living Room"
  },
  {
    type: "den",
    name: "Den"
  },
  {
    type: "studio",
    name: "Studio"
  },
  {
    type: "suite",
    name: "Suite"
  }
];
const radioInfo = [
  {
    name: "Price Negotiable:",
    type: "negotiable",
    background: true
  },
  {
    name: "Utilities included:",
    type: "utility",
    background: false
  },
  {
    name: "Private Bathroom:",
    type: "private",
    background: true
  }
];
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
    type: "Gender Inclusive", // fix this
    name: " Gender Inclusive",
    required: false
  },
  {
    type: "others",
    name: " Others",
    required: false
  }
];
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
const questionInfo = [
  {
    background: true,
    question: "Do you mind if other tenants are in the living room?",
    name: "living"
  },
  {
    background: false,
    question: "Do you have pets?",
    name: "pets"
  },
  {
    background: true,
    question: "Parking:",
    name: "parking"
  },
  {
    background: false,
    question: "Furnished:",
    name: "furnished"
  }
];
const facilitiesInfo = [
  {
    type: "washer",
    name: " Indoor Washer"
  },
  {
    type: "patio",
    name: " Patio/Balcony"
  },
  {
    type: "fridge",
    name: " Refrigerator"
  },
  {
    type: "oven",
    name: " Oven"
  },
  {
    type: "microwave",
    name: " Microwave"
  },
  {
    type: "ac",
    name: " Air Conditioning"
  },
  {
    type: "pool",
    name: " Pool"
  },
  {
    type: "SPA", // why is spa capitalized?
    name: " SPA"
  },
  {
    type: "gym",
    name: " Gym"
  },
  {
    type: "elevator",
    name: " Elevator"
  },
  {
    type: "hardwood",
    name: " Hardwood floor"
  }
];
export default class Form1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bulk: {
        negotiable: "",
        utility: "",
        address: "",
        transportation: "",
        time: "",
        bus_cnt: "0",
        price_range: "",
        private: "",
        gender: "",
        living: "",
        pets: "",
        parking: "",
        furnished: "",
        latlng: {},
        master: "no",
        guest: "no",
        single: "no",
        double: "no",
        triple: "no",
        living_room: "no",
        den: "no",
        studio: "no",
        suite: "no",
        others_room: "no",
        all: "no",
        washer: "no",
        patio: "no",
        fridge: "no",
        microwave: "no",
        oven: "no",
        ac: "no",
        pool: "no",
        SPA: "no",
        gym: "no",
        elevator: "no",
        hardwood: "no",
        Nearby: "",
        roommmate: "",
        bedroom: "1B",
        bathroom: "1B",
        host_gender: "",
        move_time1: "Early",
        move_time2: "January",
        stay_period: "One Year Lease"
      },
      photos: [],
      hidden: false,
      redirect: false
    };
    this.LatLngHelper = this.LatLngHelper.bind(this);
    this.AllChecked = this.AllChecked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleRange = this.handleRange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleMap = this.handleMap.bind(this);
    this.handleAll = this.handleAll.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  LatLngHelper = () => {
    var code = geocodeByAddress(this.state.bulk.address);
    var location = code.then(results => getLatLng(results[0]));
    return location;
  };

  AllChecked = () => {
    for (let i = 0; i < facilityArr.length; i++) {
      if (this.state.bulk[facilityArr[i]] === "no") {
        return false;
      }
    }
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    this.LatLngHelper()
      .then(lL => {
        this.setState(({ bulk }) => ({
          bulk: {
            ...bulk,
            latlng: lL
          }
        }));
      })
      .then(() => {
        formData.append("json", JSON.stringify(this.state.bulk));
        for (let i = 0; i < this.state.photos.length; i++) {
          formData.append("photos", this.state.photos[i]);
        }
        console.log(this.state.photos);
      })
      .then(() =>
        fetch(this.props.location.endpoint, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          body: formData
        }).then(() => this.setState({ redirect: true }))
      );
  };

  handleNext = () => {
    if (
      this.state.bulk.address &&
      this.state.bulk.transportation &&
      this.state.bulk.time &&
      this.state.bulk.price_range &&
      this.state.photos &&
      this.state.bulk.private &&
      this.state.bulk.gender &&
      this.state.bulk.living &&
      this.state.bulk.pets &&
      this.state.bulk.parking &&
      this.state.bulk.furnished
    ) {
      console.log(this.state.photos);
      this.setState({ hidden: true });
    } else {
      alert("Please fill out the required form!");
    }
  };

  handleBack = () => {
    this.setState({ hidden: false });
  };

  handleRange = props => {
    this.setState(({ bulk }) => ({
      bulk: {
        ...bulk,
        price_range: props
      }
    }));
  };

  handleUpload = (pictureFiles, url) => {
    this.setState(
      {
        photos: pictureFiles // this.state.photos.concat(pictureFiles[pictureFiles.length-1])
      },
      () => console.log(this.state.photos, url)
    );
  };

  handleMap = address => {
    this.setState(({ bulk }) => ({
      bulk: {
        ...bulk,
        address: address
      }
    }));
  };

  handleAll = event => {
    var val = event.target.value;
    if (val === "yes" || val === "no") {
      val = val === "yes" ? "no" : "yes";
    }
    this.setState(({ bulk }) => ({
      bulk: {
        ...bulk,
        all: val,
        washer: val,
        patio: val,
        fridge: val,
        microwave: val,
        oven: val,
        ac: val,
        pool: val,
        SPA: val,
        gym: val,
        elevator: val,
        hardwood: val
      }
    }));
  };

  handleDrop = (name, val) => {
    this.setState(({ bulk }) => ({
      bulk: {
        ...bulk,
        [name]: val[0].name
      }
    }));
  };

  handleChange = event => {
    const name = event.target.name;
    var val = event.target.value;
    if (
      [
        "master",
        "guest",
        "single",
        "double",
        "triple",
        "living_room",
        "den",
        "studio",
        "suite",
        "others_room", // we're missing this
        "all",
        "washer",
        "patio",
        "fridge",
        "microwave",
        "oven",
        "ac",
        "pool",
        "SPA",
        "gym",
        "elevator",
        "hardwood"
      ].includes(name) &&
      (val === "yes" || val === "no")
    ) {
      val = val === "yes" ? "no" : "yes";
    }
    this.setState(
      ({ bulk }) => ({
        bulk: {
          ...bulk,
          [name]: val
        }
      }),
      () => {
        if (facilityArr.includes(name)) {
          if (this.state.bulk["all"] === "yes" && !this.AllChecked()) {
            this.setState(({ bulk }) => ({
              bulk: {
                ...bulk,
                all: "no"
              }
            }));
          }
          if (this.state.bulk["all"] === "no" && this.AllChecked()) {
            this.setState(({ bulk }) => ({
              bulk: {
                ...bulk,
                all: "yes"
              }
            }));
          }
        }
      }
    );
  };

  render() {
    if (this.state.redirect === true) {
      return (
        <Redirect
          to={{
            pathname: "/housing",
            update: true
          }}
        />
      );
    }

    return (
      <>
        <div
          style={{
            marginLeft: "180px",
            marginRight: "180px",
            "font-family": "Chilanka"
          }}
        >
          <h2>Create an account</h2>
          <form onSubmit={this.handleSubmit}>
            <ImageUploader
              style={this.state.hidden ? styles.hidden : null}
              type="file"
              name="photos"
              withIcon
              buttonText="Choose images"
              onChange={this.handleUpload}
              imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
              maxFileSize={5242880}
              withPreview
            />
            <ol style={this.state.hidden ? styles.hidden : null} key="bjaksbf">
              <li style={{ background: "#FAFAF4" }} key="afasf">
                <div className="row form">
                  <div> My Location (Make sure it is searchable!): </div>
                  {/* TODO: Prop key for handleMap must begin with 'on' */}
                  <Map
                    name="address"
                    address={this.state.bulk.address || ""}
                    handleChange={this.handleMap}
                    handleSelect={this.handleMap}
                    required
                  />
                </div>
              </li>
              <li key="sfoid">
                <div className="row space-between form" key="formatter">
                  <div key="distanceSchool"> Distance to school: </div>
                  {transportationInfo.map((obj, i) => (
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
                        onChange={val => this.handleDrop(obj.type, val)}
                        required={obj.required}
                      />
                    </div>
                  ))}
                </div>
              </li>
              <li style={{ background: "#FAFAF4" }} key="asfi">
                <div className="row">
                  <div>Room Type:</div>
                  {roomCountInfo.map((obj, i) => (
                    <React.Fragment key={i}>
                      <Select
                        style={styles.roomCount}
                        options={options_number}
                        placeholder="selected ...."
                        labelField="name"
                        valueField={this.state.bulk[obj.type] || ""}
                        onChange={val => this.handleDrop(obj.type, val)}
                        required
                      />
                      <span> {obj.name}</span>
                    </React.Fragment>
                  ))}
                </div>
                <div className="row rt2">
                  <div>
                    {roomTypeInfo.map((obj, i) => (
                      <React.Fragment key={i}>
                        <input
                          type="checkbox"
                          id={obj.type}
                          name={obj.type}
                          value={this.state.bulk[obj.type]}
                          checked={this.state.bulk[obj.type] === "yes"}
                          onChange={this.handleChange}
                        />
                        <label htmlFor={obj.type}> {obj.name}</label>
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </li>
              <li key="orices">
                Price Range(Drag the dot to set lower and upper bound):
                <div className="form">
                  <Range
                    min={0}
                    max={10000}
                    marks={{
                      1000: 1000,
                      2500: 2500,
                      5000: 5000,
                      7500: 7500,
                      10000: 10000
                    }}
                    onChange={this.handleRange}
                    tipFormatter={value => `${value}`}
                  />
                </div>
              </li>
              {radioInfo.map((obj, i) => (
                <li
                  style={obj.background ? { background: "#FAFAF4" } : null}
                  key={i}
                >
                  {" "}
                  {/*make sure this works*/}
                  {obj.name}
                  <input
                    type="radio"
                    name={obj.type}
                    id={`${obj.type}_yes`}
                    value="yes"
                    checked={this.state.bulk[obj.type] === "yes"}
                    onChange={this.handleChange}
                    required
                  />{" "}
                  Yes
                  <input
                    type="radio"
                    name={obj.type}
                    id={`${obj.type}_no`}
                    value="no"
                    checked={this.state.bulk[obj.type] === "no"}
                    onChange={this.handleChange}
                  />{" "}
                  No
                </li>
              ))}
              <li key="pjssgs">
                Any preference on prospect tenants?
                {preferenceInfo.map((obj, i) => (
                  <React.Fragment key={i}>
                    <input
                      type="radio"
                      name="gender"
                      id={obj.type}
                      value={obj.type}
                      checked={this.state.bulk.gender === obj.type}
                      onChange={this.handleChange}
                      required={obj.required}
                    />
                    {obj.name}
                  </React.Fragment>
                ))}
              </li>
              {questionInfo.map((obj, i) => (
                <li
                  style={obj.background ? { background: "#FAFAF4" } : null}
                  key={i}
                >
                  {obj.question}
                  <input
                    type="radio"
                    name={obj.name}
                    value="yes"
                    checked={this.state.bulk[obj.name] === "yes"}
                    onChange={this.handleChange}
                    required
                  />{" "}
                  Yes
                  <input
                    type="radio"
                    name={obj.name}
                    value="no"
                    checked={this.state.bulk[obj.name] === "no"}
                    onChange={this.handleChange}
                  />{" "}
                  No
                </li>
              ))}
              <li style={{ background: "#FAFAF4" }} key="asfbuae">
                Required Facilities:
                <input
                  type="checkbox"
                  id="all"
                  name="all"
                  value={this.state.bulk.all}
                  checked={this.state.bulk.all === "yes"}
                  onChange={this.handleAll}
                />
                <label htmlFor="all"> All</label>
                {facilitiesInfo.map(obj => (
                  <React.Fragment key={obj.type}>
                    <input
                      type="checkbox"
                      id={obj.type}
                      name={obj.type}
                      value={this.state.bulk[obj.type]}
                      checked={this.state.bulk[obj.type] === "yes"}
                      onChange={this.handleChange}
                    />
                    <label htmlFor={obj.type}> {obj.name} </label>
                    <br />
                  </React.Fragment>
                ))}
              </li>
              <li>
                Nearby:{" "}
                <input
                  name="Nearby"
                  value={this.state.bulk.Nearby}
                  onChange={this.handleChange}
                />
              </li>
              <li style={{ background: "#FAFAF4" }}>
                Roommates/Suitmates:{" "}
                <input
                  name="roommate"
                  value={this.state.bulk.roommate}
                  onChange={this.handleChange}
                />
              </li>
              <button
                type="button"
                value="Submit"
                onClick={this.handleNext}
                style={{ border: "none" }}
              >
                {" "}
                <img src="./app/resources/next.svg" alt="next" />{" "}
              </button>
            </ol>
            <ol
              style={!this.state.hidden ? styles.hidden : null}
              key="styleCheck"
            >
              <li key="gender">
                About Your Gender
                {hostGenderInfo.map((obj, i) => (
                  <React.Fragment key={i}>
                    <input
                      type="radio"
                      name="host_gender"
                      value={obj.type}
                      checked={this.state.bulk.host_gender === obj.type}
                      onChange={this.handleChange}
                      required
                    />
                    {obj.name}
                  </React.Fragment>
                ))}
              </li>
              <li key="moveTime">
                <div className="row">
                  <div>Ideal Move in Time</div>
                  <Select
                    style={{
                      width: "135px",
                      "min-height": "13px",
                      height: "20px",
                      marginLeft: "10px",
                      marginRight: "10px"
                    }}
                    options={options_timecategories}
                    placeholder="selected ...."
                    labelField="name"
                    valueField={this.state.bulk.move_time1}
                    onChange={val => this.handleDrop("move_time1", val)}
                    required
                  />
                  <Select
                    style={{
                      width: "135px",
                      "min-height": "13px",
                      height: "20px"
                    }}
                    options={options_months}
                    placeholder="selected ...."
                    labelField="name"
                    valueField={this.state.bulk.move_time2}
                    onChange={val => this.handleDrop("move_time2", val)}
                    required
                  />
                </div>
              </li>
              <li key="minStayPeriod">
                <div className="row">
                  <div>Minimum Stay Period</div>
                  <Select
                    style={{
                      width: "135px",
                      "min-height": "13px",
                      height: "20px",
                      marginLeft: "10px",
                      marginRight: "10px"
                    }}
                    options={options_lease}
                    placeholder="selected ...."
                    labelField="name"
                    valueField={this.state.bulk.stay_period}
                    onChange={val => this.handleDrop("stay_period", val)}
                    required
                  />
                  <div>
                    Others/Notes:{" "}
                    <input
                      name="host_stay_period_notes"
                      value={this.state.bulk.host_stay_period_notes}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </li>
            </ol>
            <button
              type="button"
              value="Submit"
              onClick={this.handleBack}
              style={!this.state.hidden ? styles.hidden : null}
            >
              {" "}
              Go Back{" "}
            </button>
            <input
              type="submit"
              name="submit"
              value="submit"
              style={!this.state.hidden ? styles.hidden : null}
            />
          </form>
        </div>
      </>
    );
  }
}
