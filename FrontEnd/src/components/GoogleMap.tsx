import React, { useEffect, useState } from 'react';
import {
  GoogleMap as GoogleMapAPI,
  withGoogleMap,
  Marker,
} from 'react-google-maps';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { mapIcons, Icon } from '../assets/icons/all';

interface Coords {
  lat: number;
  lng: number;
}

interface PathProps {
  address: string;
  className?: string;
}

const GoogleMap: React.FC<PathProps> = ({
  address,
  className = 'google-map-wrapper',
}) => {
  const [center, setCenter] = useState<Coords>({ lat: 32.8801, lng: -117.234 }); // TODO this is no good. We need to have a loading symbol in the map when this is not set. Solution: Keep track of when the center is set from useEffect (use a var with useState). If it hasn't been set yet, then instead of showing the mapPin, show the loading gif
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    // Mounted is needed for React (not always necessary). You can only update a component's
    // state when it is mounted -- we potentially set the state after it is already unmounted
    // because of the async calls. Thus, we need to check if it is mounted before updating the state
    let mounted = true;

    // function that gets and sets the map pin
    const setMapPin = async () => {
      const code = await geocodeByAddress(address);
      const location = await getLatLng(code[0]);
      if (mounted) setCenter(location);
    };
    setMapPin();

    return () => {
      mounted = false;
    };
  }, [address, setCenter]);
  const GoogleMapRender = withGoogleMap(() => (
    <GoogleMapAPI center={center} defaultZoom={zoom}>
      {/* <MapPin position={center} /> */}
      <Marker
        position={center}
        icon={{
          url: 'https://houseit.s3.us-east-2.amazonaws.com/assets/mapPin.svg',
          anchor: new google.maps.Point(17, 46),
        }}
      />
    </GoogleMapAPI>
  ));
  return (
    <div className={className}>
      <GoogleMapRender
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default GoogleMap;
