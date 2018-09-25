import React, { Component } from 'react';

class QuizScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: this.props.count
        }
      }

    render() {
        return (
            <div className="App"><h3>Final Score: {this.state.score}</h3></div>
        )
    }
}

export default QuizScore;
