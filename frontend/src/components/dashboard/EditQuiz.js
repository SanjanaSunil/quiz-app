import React, { Component } from 'react';

class EditQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.return = this.return.bind(this);
  }

  return(event) {
    window.location = 'http://localhost:3000/ViewQuizzes'
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

          <button type="submit" className="btn btn-primary btn-sm" onClick={this.return}>Back</button>

      </div>
    );
  }
}

export default EditQuiz;
