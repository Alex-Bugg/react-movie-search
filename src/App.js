import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Header , Footer} from './component'
import {Film, Home , Profile} from './page'

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile} />
            <Route path='/film' component={Film} />
          </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
