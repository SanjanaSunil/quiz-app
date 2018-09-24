import React, { Component } from 'react';
import './ViewUsers.css';

class EditQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
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

  render() {
    return (
      <div className="App">
        <div>{this.state.data.map((item, key)=> {
            return (
               <p key = {key}>{item.question}</p>
             )
          })}</div>
      </div>
    );
  }
}

export default EditQuiz;
