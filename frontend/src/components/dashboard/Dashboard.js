import React, { Component } from 'react';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: []
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
      .then(response =>
        //if(response.status === 200)
          // console.log(response.status);
          response.json())
      .then(data => this.setState({data: data}));

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
                window.location = 'http://localhost:3000'
            }
        });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Qureka {this.state.data.username}</h1>
        </header>
        <div className="container">
          <span className="pull-right"><button onClick={this.logout} className="btn btn-primary btn-lg btn-login btn-block">Log out</button></span>
        </div>
        <h1>{this.state.data.username}</h1>
      </div>
    );
  }
}

export default Dashboard;
