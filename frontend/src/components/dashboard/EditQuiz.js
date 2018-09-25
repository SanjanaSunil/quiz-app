import React, { Component } from 'react';

class EditQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre_id: parseInt(this.props.genre_id, 10),
      question: "",
      option1: "",
      answer1: "false",
      option2: "",
      answer2: "false",
      option3: "",
      answer3: "false",
      option4: "",
      answer4: "false",
      data: [],
    }
    this.return = this.return.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);

    this.handleOptionOne = this.handleOptionOne.bind(this);
    this.handleOptionTwo = this.handleOptionTwo.bind(this);
    this.handleOptionThree = this.handleOptionThree.bind(this);
    this.handleOptionFour = this.handleOptionFour.bind(this);

    this.handleAnsOne = this.handleAnsOne.bind(this);
    this.handleAnsTwo = this.handleAnsTwo.bind(this);
    this.handleAnsThree = this.handleAnsThree.bind(this);
    this.handleAnsFour = this.handleAnsFour.bind(this);
  }

  return(event) {
    window.location = 'http://localhost:3000/ViewQuizzes'
  }

  handleQChange(event) {
    this.setState({question: event.target.value});
  }

  handleOptionOne(event) {
    this.setState({option1: event.target.value});
  }

  handleOptionTwo(event) {
    this.setState({option2: event.target.value});
  }

  handleOptionThree(event) {
    this.setState({option3: event.target.value});
  }

  handleOptionFour(event) {
    this.setState({option4: event.target.value});
  }

  handleAnsOne(event) {
    this.setState({answer1: "true"});
  }

  handleAnsTwo(event) {
    this.setState({answer2: "true"});
  }

  handleAnsThree(event) {
    this.setState({answer3: "true"});
  }

  handleAnsFour(event) {
    this.setState({answer4: "true"});
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
          this.setState({option1: ""});
          this.setState({option2: ""});
          this.setState({option3: ""});
          this.setState({option4: ""});
          this.setState({answer1: "false"});
          this.setState({answer2: "false"});
          this.setState({answer3: "false"});
          this.setState({answer4: "false"});
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

          <button type="submit" className="btn btn-success btn-lg" onClick={this.return}>Back</button>

          <br />
          <div className="container">
            <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.question} onChange={this.handleQChange}/>
            </div>
            <div className="form-group">
                <label>Option 1</label>
                <input type="text" className="form-control" value={this.state.option1} onChange={this.handleOptionOne}/>
                <p>Select if this answer is correct</p>
                <input type="checkbox" name="checkInput" value={this.state.answer1} onChange={this.handleAnsOne}/>
            </div>
            <div className="form-group">
                <label>Option 2</label>
                <input type="text" className="form-control" value={this.state.option2} onChange={this.handleOptionTwo}/>
                <p>Select if this answer is correct</p>
                <input type="checkbox" name="checkInput" value={this.state.answer2} onChange={this.handleAnsTwo}/>
            </div>
            <div className="form-group">
                <label>Option 3</label>
                <input type="text" className="form-control" value={this.state.option3} onChange={this.handleOptionThree}/>
                <p>Select if this answer is correct</p>
                <input type="checkbox" name="checkInput" value={this.state.answer3} onChange={this.handleAnsThree}/>
            </div>
            <div className="form-group">
                <label>Option 4</label>
                <input type="text" className="form-control" value={this.state.option4} onChange={this.handleOptionFour}/>
                <p>Select if this answer is correct</p>
                <input type="checkbox" name="checkInput" value={this.state.answer4} onChange={this.handleAnsFour}/>
            </div>
                <br></br>
                <button type="submit" className="btn btn-primary btn-lg btn-login btn-block">Create Question</button>
            </form>
          </div>
          </div></div>

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
