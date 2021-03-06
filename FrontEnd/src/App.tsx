import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Landing from './pages/Landing';
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
            </Switch>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
