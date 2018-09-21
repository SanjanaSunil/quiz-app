import React, { Component } from 'react';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    }
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8000/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state),
    })
      .then(response => {
            if(response.status >= 200 && response.status < 300) {
                window.location = 'http://localhost:3000'
            }
      });
  }

  handleUChange(event) {
    this.setState({username: event.target.value});
  }
  handlePChange(event) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <div className="container">
            <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
            <p><b>Register</b></p>
            <div className="formContainer">
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
                </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary btn-lg btn-login btn-block">Sign Up</button>
                </form>
            </div>
            </div>   
        </div>
      </div>
    );
  }
}

export default SignUp;