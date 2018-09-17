import React, { Component } from 'react';
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Qureka</h1>
        </header>
        <div className="container">
        <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
          <p>Sign in to get access </p>
          <a onClick={this.authenticate} className="btn btn-primary btn-lg btn-login btn-block">Sign In</a>
        </div>
      </div>
      </div>
    );
  }
}

export default Home;
