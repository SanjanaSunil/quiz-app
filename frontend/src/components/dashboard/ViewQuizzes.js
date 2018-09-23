import React, { Component } from 'react';
import './ViewUsers.css'

class ViewUsers extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/genres', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })
      .then(response =>
          response.json())
      .then(data => this.setState({data: data}));

  }

  render() {
    return (
      <div className="App">
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Topic</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key)=> {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.genre}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
       <br></br>
      </div>
    );
  }
}

export default ViewUsers;
