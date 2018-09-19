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
    const request = new Request('http://127.0.0.1:8000/user');
    fetch(request)
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
