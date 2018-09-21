import React, { Component } from 'react';
import Redirect from 'react-router-dom/Redirect';
import Dashboard from '../dashboard/Dashboard'

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
          data: [],
          formData: {
            username: "",
            password: ""
          },
          submitted: false,
        }
        this.handleUChange = this.handleUChange.bind(this);
        this.handlePChange = this.handlePChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (event) {
        event.preventDefault();
        fetch('http://localhost:8000/signin', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.formData),
        })
            .then(response => {
                if(response.status >= 200 && response.status < 300) {
                    this.setState({submitted: true});
                    window.location = 'http://localhost:3000'
                }
            });
    }

    handleUChange(event) {
        this.state.formData.username = event.target.value;
    }
    handlePChange(event) {
        this.state.formData.password = event.target.value;
    }

  render() {
    return (
      <div className="App">
        <div className="container">
            <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
            <p><b>Login</b></p>
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
                    <button type="submit" className="btn btn-primary btn-lg btn-login btn-block">Sign In</button>
                </form>
            </div>
            </div>   
        </div>
      </div>
    );
  }
}

export default SignIn;