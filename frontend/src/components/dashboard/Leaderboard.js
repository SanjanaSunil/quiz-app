import React, { Component } from 'react';
import './ViewUsers.css';

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8000/leaderboard', {
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
            <h3><b>LEADERBOARD</b></h3>
            <table className="table-hover">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Lead Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key)=> {
               return (
                  <tr key = {key}>
                      <td>{item.genre}</td>
                      <td>{item.username}</td>
                      <td>{item.max}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
            </div>
        );
    }
}

export default Leaderboard;