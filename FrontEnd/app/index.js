import React from "react";
import ReactDOM from "react-dom";
import Form1 from "./components/Form1";
import Nav from "./components/Nav";
import Housing from "./components/Housing";
import ChatApp from "./components/ChatApp";
import Chat from "./components/Chat";
import CalendarSelect from "./components/CalendarSelect";
import Main from "./components/Main";
import Logout from "./components/Logout";
import HouseDetail from "./components/HouseDetail";
import Login from "./components/Login";
import { LastLocationProvider } from "react-router-last-location";
import "./index.css";
import { ThemeProvider } from "./contexts/theme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Error from "./components/Error";
import People from "./components/People";
import Profile from "./components/Profile";

window.onclick = function(event) {
  if (
    !event.target.matches(".dropbtn img") &&
    !$(event.target).parents(".dropdown-content").length
  ) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function App() {
  const cookies = Object.fromEntries(
    document.cookie.split("; ").map(x => x.split("="))
  );
  const [uid, setUid] = React.useState(cookies.userid || false);
  const [token, setToken] = React.useState(cookies.token || false);
  const [login, setLogin] = React.useState(
    cookies.userid !== undefined || false
  );
  const [pic, setPic] = React.useState(
    cookies.profile_pic || "./app/resources/login.svg"
  );
  const [theme, setTheme] = React.useState("love");
  const toggleTheme = () =>
    setTheme(theme => (theme === "love" ? "loved" : "love"));
  const toggleLogin = () => setLogin(login => login !== true);
  const endpoint = "http://localhost:3001/";

  const themeElements = {
    uid: uid,
    login: login,
    profile_pic: pic,
    theme: theme,
    token: token,
    setToken: setToken,
    setUid: setUid,
    setPic: setPic,
    toggleTheme: toggleTheme,
    toggleLogin: toggleLogin,
    endpoint: endpoint
  };

  return (
    <Router>
      <LastLocationProvider>
        <ThemeProvider value={themeElements}>
          <>
            <Nav />
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/hosting_form" component={Form1} />
              <Route exact path="/housing" component={Housing} />
              <Route
                exact
                path="/chat"
                component={() => <Chat endpoint={endpoint} />}
              />
              <Route exact path="/details" component={HouseDetail} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/streamapi" component={ChatApp} />
              <Route exact path="/tenant" component={People} />
              <Route exact path="/calendar" component={CalendarSelect} />
              <Route exact path="/profile" component={Profile} />
              <Route
                component={() => (
                  <Error message="Unexplored Territory -- FORT OH FORT" />
                )}
              />
            </Switch>
          </>
        </ThemeProvider>
      </LastLocationProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
