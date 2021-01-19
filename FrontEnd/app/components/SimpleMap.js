import React from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const SimpleMap = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDP7ZDv6xGzfVe7y7Sgb3MsYMqCVLNljeY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "100%" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 100, lng: -100 }}
      center={props.markers[0] && props.markers[0].location}
      mapTypeControl={false}
    >
      {props.markers.map(marker => {
        console.log(marker.location);
        return (
          <Marker key={marker.place_id} position={marker.location}>
            {props.isOpen && (
              <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>Open</div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});
export default SimpleMap;
