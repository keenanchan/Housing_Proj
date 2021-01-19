import React from "react";
import { Redirect } from "react-router-dom";
import { useLastLocation } from "react-router-last-location";
const RedirPrev = () => {
  const lastLocation = useLastLocation();
  console.log(lastLocation);
  return (
    <Redirect
      to={{
        pathname: (lastLocation && lastLocation.pathname) || "/"
      }}
    />
  );
};
export default RedirPrev;
