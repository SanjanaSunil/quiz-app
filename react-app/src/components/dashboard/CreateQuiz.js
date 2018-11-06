import React, { Component } from 'react';

class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {
      genre: "",
      error: false,
      existingTopic: false
    }
    this.handleTChange = this.handleTChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    if (/^ *$/.test(this.state.genre)) {
      this.setState({error: true});
      return;
    }
    else {
      this.setState({error: false});
    }
    fetch('http://localhost:8000/create/genre', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state),
    })
      .then(response => {
            if(response.status >= 200 && response.status < 300) {
                window.location = 'http://localhost:3000/ViewQuizzes'
            }
            else {
              this.setState({existingTopic: true});
            }
      });
  }

  handleTChange(event) {
    this.setState({genre: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <div className="container">
            <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
            <p><b>Create Topic</b></p>
            { this.state.error && 
              <div className="alert alert-danger">
                Topic cannot be empty
              </div>
            }
            { this.state.existingTopic && 
              <div className="alert alert-danger">
                Topic already exists
              </div>
            }
            <div className="formContainer">
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Topic</label>
                    <input type="text" className="form-control" value={this.state.genre} onChange={this.handleTChange}/>
                </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary btn-lg btn-login btn-block">Create</button>
                </form>
            </div>
            </div>   
        </div>
      </div>
    );
  }
}

export default CreateQuiz;