import React, { Component } from 'react';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      username: "",
      password: ""
    }
  }

  componentDidMount() {
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
                    <input type="text" className="form-control" value={this.state.username} onChange={this.handleFChange}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.handleLChange}/>
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