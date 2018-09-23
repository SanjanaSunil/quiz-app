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
    fetch('http://localhost:8000/users', {
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
              <th>Username</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.username}</td>
                      <td>{item.type}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default ViewUsers;
