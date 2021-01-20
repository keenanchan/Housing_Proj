import React from "react";
import queryString from "query-string";
import SimpleMap from "./SimpleMap";
import Gallery from "react-grid-gallery";

export default class HouseDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      id: "",
      intro: "",
      main_pic: "",
      pics: [],
      price_range: "",
      stay_period: "",
      move_time: "",
      others: [],
      lat: 0,
      lng: 0,
      markers: [],
      IMAGES: [],
      thumbnailWidth_big: 200,
      thumbnailWidth_small: 100,
      thumbnailHeight: 180
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  updateDimensions() {
    this.setState(
      {
        thumbnailWidth_small: Math.floor($("#gallery").width() / 3),
        thumbnailWidth_big: Math.floor($("#gallery").width() / 2),
        thumbnailHeight: Math.floor($("#gallery").height() / 2) - 2
      },
      () =>
        this.setState(
          {
            IMAGES: this.state.pics.map((pic, index) => {
              return {
                src: pic,
                thumbnail: pic,
                thumbnailWidth:
                  index < 2
                    ? this.state.thumbnailWidth_big
                    : this.state.thumbnailWidth_small,
                thumbnailHeight: this.state.thumbnailHeight,
                tags:
                  index === 4 && this.state.pics.length - index - 1
                    ? [
                        {
                          value: `${this.state.pics.length - index - 1}+`,
                          title: "last"
                        }
                      ]
                    : []
              };
            })
          },
          () =>
            console.log(
              this.state.thumbnailHeight,
              this.state.thumbnailWidth_big,
              $("#gallery").width()
            )
        )
    );
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
    const { Room } = queryString.parse(this.props.location.search);
    fetch("http://localhost:3001/getSingle", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ house_id: Room })
    })
      .then(res => res.json())
      .then(
        ({
          name,
          id,
          intro,
          main_pic,
          pics,
          price_range,
          stay_period,
          move_time,
          others,
          lat,
          lng
        }) =>
          this.setState({
            name,
            id,
            intro,
            main_pic,
            pics,
            price_range,
            stay_period,
            move_time,
            others,
            lat,
            lng
          })
      )
      .then(() =>
        this.setState({
          markers: [
            {
              location: { lat: this.state.lat, lng: this.state.lng },
              place_id: this.state.id,
              title: this.state.name
            }
          ]
        })
      )
      .then(() => this.updateDimensions());
  }

  render() {
    return (
      <>
        <div className="detailrow">
          <div className="left" id="gallery">
            <Gallery
              images={this.state.IMAGES}
              rowHeight={this.state.thumbnailHeight}
              maxRows={2}
            />
          </div>
          <div className="right_div">
            <SimpleMap markers={this.state.markers} />
          </div>
        </div>
        <div className="detailrow">
          <div className="left">
            <h2>About this Place</h2>
            {this.state.others.map((name, index) => {
              return (
                <img
                  key={index}
                  src={`./app/resources/${name}.svg`}
                  alt={name}
                  width="90"
                  height="90"
                />
              );
            })}
            <h2>Nearby</h2>
            <h2>Others</h2>
          </div>
          <div className="right_div">
            <h2>About the owner</h2>
            <h2>The house is looking for</h2>
          </div>
        </div>
      </>
    );
  }
}
