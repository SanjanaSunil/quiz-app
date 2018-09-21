import React, { Component } from 'react';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      user: [],
    }
    this.logout = this.logout.bind(this);
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
          console.log(response);
      });
  }

  logout (event) {
    event.preventDefault();
    fetch('http://localhost:8000/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if(response.status >= 200 && response.status < 300) {
                console.log("SUCCESSFULLY LOGGED OUT!");
            }
        });
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
