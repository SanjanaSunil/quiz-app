import React, { Component } from 'react';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Qureka</h1>
        </header>
        <div className="container">
          <span className="pull-right"><a onClick={this.logout}>Log out</a></span>
        </div>
      </div>
    );
  }
}

export default Dashboard;
