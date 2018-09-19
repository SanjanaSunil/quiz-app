import React, { Component } from 'react';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      user: ""
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8000/user');
    fetch(request)
      .then(response => response.json())
        .then(user => this.setState({user: user}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Qureka</h1>
        </header>
        <div className="container">
          <h2>{this.state.user}</h2>
          <span className="pull-right"><a onClick={this.logout}>Log out</a></span>
        </div>
      </div>
    );
  }
}

export default Dashboard;
