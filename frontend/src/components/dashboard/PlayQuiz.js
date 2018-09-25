import React, { Component } from 'react';
import QuizScore from './QuizScore';

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
      end: false
    }
    this.return = this.return.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.fetchOptions = this.fetchOptions.bind(this);
    this.handleAns = this.handleAns.bind(this);
    this.verify = this.verify.bind(this);
  }

  verify() {
    var key1 = document.getElementById("0").value;
    var key2 = document.getElementById("1").value;
    var key3 = document.getElementById("2").value;
    var key4 = document.getElementById("3").value;
    if(this.state.answer1===key1 && this.state.answer2===key2 && this.state.answer3===key3 && this.state.answer4===key4) {
      var temp = this.state.count + 1;
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
  }

  render() {
    return (
      <div className="App">
        <button type="submit" className="btn btn-success btn-lg" onClick={this.return}>Back</button>

        {this.state.end && <QuizScore count={this.state.count}/>}
      {!this.state.end && 
      <div>
          <br />
          <h4>{this.state.count}</h4>
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
