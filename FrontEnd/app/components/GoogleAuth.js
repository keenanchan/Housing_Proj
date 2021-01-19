import React from "react";
import { NavLink } from "react-router-dom";
import ThemeContext from "../contexts/theme";
import RedirPrev from "./RedirPrev";
import GoogleLogin from "react-google-login";

const responseGoogle = response => {
  console.log(response);
};

export default function GoogleAuth() {
  const [state_token, setstate_token] = React.useState(null);
  const theme = React.useContext(ThemeContext);
  const { toggleLogin, setPic, setUid, set_token, login } = theme;
  React.useEffect(() => {
    fetch("http://localhost:3001/getstate", {
      mode: "cors",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setstate_token(data))
      .then(() => console.log("hello"));
  }, []);
  const onSuccess = response => {
    response.state_token = state_token;
    fetch("http://localhost:3001/gconnect", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(response)
    }).then(res => {
      res.json().then(arr => {
        toggleLogin();
        setPic(arr[0]);
        setUid(arr[1]);
        setToken(arr[2]);
      });
    });
  };
  return (
    (login && <RedirPrev />) || (
      <GoogleLogin
        clientId="778916194800-977823s60p7mtu1sj72ru0922p2pqh6m.apps.googleusercontent.com"
        onSuccess={response => {
          onSuccess(response);
        }}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
        icon={false}
        render={renderProps => (
          <NavLink
            to="/haha"
            // TODO: Handler function for onClick prop key must begin with 'handle'
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <img
              src="./app/resources/login_account.svg"
              style={{
                width: "80%",
                height: "10%",
                marginLeft: "35px",
                marginTop: "25px"
              }}
            />
          </NavLink>
        )}
      />
    )
  );
}
