import React, { Component } from 'react';
import Home from './Home';
import LoggedIn from './LoggedIn';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true
    }
  }
  render() {
    if (this.state.loggedIn) {
      return (<LoggedIn />);
    } else {
      return (<Home />);
    }
  }
}

export default App;
