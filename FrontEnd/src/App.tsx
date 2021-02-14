import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Landing from './pages/Landing';
import DateSelecter from './components/DateSelecter';
import Monthelecter from './components/MonthSelecter';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/landing" component={Landing} />
          <div>
            <NavBar />
            <Switch>
              <Route path="/" component={Home} />
              <Route exact path="/calendar" component={DateSelecter} />
              <Route exact path="/month_picker" component={Monthelecter} />
            </Switch>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
