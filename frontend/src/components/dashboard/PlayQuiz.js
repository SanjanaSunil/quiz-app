import React, { Component } from 'react';
import QuizScore from './QuizScore';
import './PlayQuiz.css'

class PlayQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre_id: parseInt(this.props.genre_id, 10),
      data: [],
      options: [],
      count: 0,
      answer1: "false",
      answer2: "false",
      answer3: "false",
      answer4: "false",
      end: false,
      user_details: []
    }
    this.return = this.return.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.fetchOptions = this.fetchOptions.bind(this);
    this.handleAns = this.handleAns.bind(this);
    this.verify = this.verify.bind(this);
  }

  verify() {
    var temp;
    if(this.state.count===this.state.data.length-1) {
      temp = this.state.count + 1;
      this.setState({count: temp});
      this.setState({end: true});
      return;
    }
    var key1 = document.getElementById("0").value;
    var key2 = document.getElementById("1").value;
    var key3 = document.getElementById("2").value;
    var key4 = document.getElementById("3").value;

    this.setState({answer1: "false"});
    this.setState({answer2: "false"});
    this.setState({answer3: "false"});
    this.setState({answer4: "false"});

    if(this.state.answer1===key1 && this.state.answer2===key2 && this.state.answer3===key3 && this.state.answer4===key4) {
      temp = this.state.count + 1;
      this.setState({count: temp});
    }
    else {
      this.setState({end: true});
    }

  }

  handleAns(key, event) {
    if(key===0) this.setState({answer1: "true"});
    if(key===1) this.setState({answer2: "true"});
    if(key===2) this.setState({answer3: "true"});
    if(key===3) this.setState({answer4: "true"});
  }

  return(event) {
    window.location = 'http://localhost:3000/ViewQuizzes'
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

  fetchOptions(id) {
    id = parseInt(id, 10);
    fetch('http://localhost:8000/question/' + id, {
      method: 'GET',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(options => this.setState({options: options}));
  }

  componentDidMount() {
    this.fetchQuestions();
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
      .then(user_details => this.setState({user_details: user_details}));
  }

  render() {
    return (
      <div className="App">
        <button type="submit" className="btn btn-warning btn-lg" onClick={this.return}>Back</button>
        {this.state.end && <QuizScore count={this.state.count} genre_id={this.props.genre_id} username={this.state.user_details.username}/>}
      {!this.state.end && 
      <div>
          <br />
          <div className="progress" style={{width: window.innerWidth}}>
            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={this.state.count*window.innerWidth/this.state.data.length} aria-valuemin="0" aria-valuemax={window.innerWidth} style={{width:this.state.count*window.innerWidth/this.state.data.length}}>
                <span className="sr-only">{this.state.count*100/this.state.data.length} Complete</span>
            </div>
          </div> 
          <h4>Score: {this.state.count}</h4>
          <div>{this.state.data.map((item, key)=> {
            return (
               <div key = {key}>{ this.state.count===key &&
                 <div><p>{key+1}) {item.question} {this.fetchOptions(item.id)}</p>
                    {this.state.options.map((item, key)=> {
                      return (
                        <ul key = {key}>
                          <input type="checkbox" name="checkInput" id={key} value={item.answer} onChange={(event) =>this.handleAns(key, event)}/>
                          <li>{item.option}</li>
                        </ul>
                      )
                     })}
                    
                  </div>}</div>
             )
          })}</div>

          <button className="btn btn-primary btn-lg" onClick={this.verify}>Submit</button>
      </div>
      }
      </div>
    );
  }
  
}

export default PlayQuiz;
