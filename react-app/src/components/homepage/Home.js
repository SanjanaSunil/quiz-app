import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import './Home.css'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Qureka</h1>
        </header>
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/SignUp'}>Register</Link></li>
                    <li><Link to={'/SignIn'}>Login</Link></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                  <Route exact path='/SignUp' component={SignUp} />
                  <Route exact path='/SignIn' component={SignIn} />
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default Home;
