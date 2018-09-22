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
  componentDidMount() {
    fetch('http://localhost:8000/user', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })
      .then(response => {
        if(response.status === 200)
          this.setState({loggedIn: true});
          console.log(response);
      });
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
