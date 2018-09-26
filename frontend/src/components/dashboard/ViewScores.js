import React, { Component } from 'react';
import './ViewUsers.css'

class ViewScores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    
    componentDidMount() {
        fetch('http://localhost:8000/scoreboard/' + this.props.data.username, {
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
                <h3><b>SCOREBOARD</b></h3>

                <table className="table-hover">
          <thead>
            <tr>
              <th>Genre</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key)=> {
               return (
                  <tr key = {key}>
                      <td>{item.genre}</td>
                      <td>{item.score}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
            </div>
        );
    } 
}

export default ViewScores;