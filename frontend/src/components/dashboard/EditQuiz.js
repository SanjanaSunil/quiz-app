import React, { Component } from 'react';

class EditQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre_id: parseInt(this.props.genre_id, 10),
      question: "",
      data: [],
    }
    this.return = this.return.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  return(event) {
    window.location = 'http://localhost:3000/ViewQuizzes'
  }

  handleQChange(event) {
    this.setState({question: event.target.value});
  }

  fetchQuestions(event) {
    fetch('http://localhost:8000/genre/' + this.props.genre_id, {
      method: 'GET',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => this.setState({data: data}));
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8000/question', {
      method: 'POST',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state),
    })
    .then(response => {
      if(response.status >= 200 && response.status < 300) {
          this.setState({question: ""});
          this.fetchQuestions();
      }

  });
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  render() {
    return (
      <div className="App">
          <div className="container">
            <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.question} onChange={this.handleQChange}/>
            </div>
                <br></br>
                <button type="submit" className="btn btn-primary btn-lg btn-login btn-block">Create Question</button>
            </form>
          </div>
          </div></div>

          <button type="submit" className="btn btn-success btn-lg" onClick={this.return}>Back</button>

          <div>{this.state.data.map((item, key)=> {
            return (
               <p key = {key}>{key+1}) {item.question}</p>
             )
          })}</div>

      </div>
    );
  }
}

export default EditQuiz;
