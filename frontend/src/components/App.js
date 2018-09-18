import React, { Component } from 'react';
import Home from './homepage/Home';
import Dashboard from './dashboard/Dashboard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }
  render() {
    if (this.state.loggedIn) {
      return (<Dashboard />);
    } else {
      return (<Home />);
    }
  }
}

export default App;
