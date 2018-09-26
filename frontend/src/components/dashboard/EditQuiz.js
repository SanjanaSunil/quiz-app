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
      options: []
    }
    this.return = this.return.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.fetchOptions = this.fetchOptions.bind(this);

    this.handleOptionOne = this.handleOptionOne.bind(this);
    this.handleOptionTwo = this.handleOptionTwo.bind(this);
    this.handleOptionThree = this.handleOptionThree.bind(this);
    this.handleOptionFour = this.handleOptionFour.bind(this);

    this.handleAnsOne = this.handleAnsOne.bind(this);
    this.handleAnsTwo = this.handleAnsTwo.bind(this);
    this.handleAnsThree = this.handleAnsThree.bind(this);
    this.handleAnsFour = this.handleAnsFour.bind(this);

    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.updateOption = this.updateOption.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
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

  fetchOptions(event) {
    fetch('http://localhost:8000/options', {
      method: 'GET',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(options => this.setState({options: options}));
  }

  deleteQuestion(event) {
    fetch('http://localhost:8000/delete/question/' + event.target.value, {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => {window.location.reload();});
  }

  updateOption(key, event) {
    var temp = this.state.options;
    temp[key].option = event.target.value;
    this.setState({options: temp});
  }

  updateAnswer(key, event) {
    var temp = this.state.options;
    if(this.state.options[key].answer==="true") temp[key].answer = "false";
    else temp[key].answer = "true";
    this.setState({options: temp});
  }

  editQuestion(submitquestion, event) {
    var submission = {
      id: parseInt(event.target.value, 10),
      genre_id: this.state.genre_id,
      question: submitquestion,
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
    }
    var temp = 0;
    for(var i=0; i<this.state.options.length; i++) {
      if(parseInt(this.state.options[i].question_id, 10) === parseInt(event.target.value, 10)) {
        if(temp===0) {
          submission.option1 = this.state.options[i].option;
          submission.answer1 = this.state.options[i].answer;
          temp++;
          continue;
        }
        if(temp===1) {
          submission.option2 = this.state.options[i].option;
          submission.answer2 = this.state.options[i].answer;
          temp++;
          continue;
        }
        if(temp===2) {
          submission.option3 = this.state.options[i].option;
          submission.answer3 = this.state.options[i].answer;
          temp++;
          continue;
        }
        if(temp===3) {
          submission.option4 = this.state.options[i].option;
          submission.answer4 = this.state.options[i].answer;
          temp++;
          continue;
        }
      }
    }

    console.log(submission);
    fetch('http://localhost:8000/question', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(submission),
    })
    .then(response => {
      if(response.status >= 200 && response.status < 300) {
        this.fetchQuestions();
        this.fetchOptions();
        window.location.reload();
      }
    });
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
          this.fetchOptions();
      }   

  });
  }

  componentDidMount() {
    this.fetchQuestions();
    this.fetchOptions();
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

          <table className="table-hover">
          <thead>
            <tr>
              <th>Number</th>
              <th>Question</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key)=> {
               return (
                  <tr key = {key}>
                      <td>{key+1}</td>
                      <td><p>Question: </p><input type="text" placeholder={item.question} /><p>Options: </p>
                      {this.state.options.map((itemtwo, keytwo)=> {
                        return (
                          <div key={keytwo}>
                          { item.id===itemtwo.question_id &&
                            <div>
                              <input type="text" placeholder={itemtwo.option} onChange={(event) =>this.updateOption(keytwo, event)} />
                              { itemtwo.answer==="true" &&
                                <input type="checkbox" name="checkBox" value={itemtwo.answer} onClick={(event) =>this.updateAnswer(keytwo, event)} checked/>
                              }
                              { itemtwo.answer!=="true" &&
                                <input type="checkbox" name="checkBox" value={itemtwo.answer} onClick={(event) =>this.updateAnswer(keytwo, event)}/>
                              }
                            </div>
                          }</div>
                        )
                      })}
                      <button type="submit" className="btn btn-primary btn-md" onClick={(event) =>this.editQuestion(item.question, event)} value={item.id}>Edit</button>
                      </td>
                      <td><button type="submit" className="btn btn-danger btn-md" onClick={this.deleteQuestion} value={item.id}>Delete</button></td>

                  </tr>
                )
             })}
          </tbody>
       </table>

      </div>
    );
  }
}

export default EditQuiz;
