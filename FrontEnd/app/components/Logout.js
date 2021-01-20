import React from "react";
import { Redirect } from "react-router-dom";
import ThemeContext from "../contexts/theme";

export default function Logout() {
  const theme = React.useContext(ThemeContext);
  // toggleLogin
  const { setPic, setUid, setToken } = theme;
  React.useEffect(() => {
    fetch("http://localhost:3001/gdisconnect", {
      mode: "cors",
      method: "POST",
      credentials: "include"
    }).then(() => {
      localStorage.clear();
      setPic("./app/resources/login.png");
      setUid(false);
      setToken(false);
    });
  });
  return (
    <Redirect
      to={{
        pathname: "/"
      }}
    />
  );
}
