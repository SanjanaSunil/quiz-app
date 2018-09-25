import React, { Component } from 'react';

class PlayQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre_id: parseInt(this.props.genre_id, 10),
      data: [],
      options: [],
      count: 0,
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: ""
    }
    this.return = this.return.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.fetchOptions = this.fetchOptions.bind(this);
    this.handleAns = this.handleAns.bind(this);
    this.verify = this.verify.bind(this);
  }

  verify() {
    if(this.state.answer1==="false" || this.state.answer2==="false" || this.state.answer3==="false" || this.state.answer4==="false"){
      this.return();
    }
    else {
      var temp = this.state.count + 1;
      this.setState({count: temp});
    }

  }

  handleAns(key, event) {
    if(key===0) this.setState({answer1: event.target.value});
    if(key===1) this.setState({answer2: event.target.value});
    if(key===2) this.setState({answer3: event.target.value});
    if(key===3) this.setState({answer4: event.target.value});
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

          <br />

          <div>{this.state.data.map((item, key)=> {
            return (
               <div key = {key}>{ this.state.count===key &&
                 <div><p>{key+1}) {item.question} {this.fetchOptions(item.id)}</p>
                    {this.state.options.map((item, key)=> {
                      return (
                        <ul key = {key}>
                          <input type="checkbox" name="checkInput" value={item.answer} onChange={(event) =>this.handleAns(key, event)}/>
                          <li>{item.option}</li>
                        </ul>
                      )
                     })}
                    
                  </div>}</div>
             )
          })}</div>

          <button className="btn btn-primary btn-lg" onClick={this.verify}>Submit</button>
      </div>
    );
  }
}

export default PlayQuiz;
