import React, { Component } from 'react';

class QuizScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: parseInt(this.props.count, 10),
            genre_id: parseInt(this.props.genre_id, 10),
            username: this.props.username
        }
      }

    componentDidMount() {
        fetch('http://localhost:8000/score', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state),
        })
          .then(response => {
                if(response.status >= 200 && response.status < 300) {
                    console.log("SUCCESS");
                }
                else {
                    console.log("FAILURE");
                }
          });
    }
    render() {
        return (
            <div className="App"><h3>Final Score: {this.state.score} {this.state.username}</h3></div>
        )
    }
}

export default QuizScore;
