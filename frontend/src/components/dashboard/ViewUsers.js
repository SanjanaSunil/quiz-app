import React, { Component } from 'react';
import './ViewUsers.css'

class ViewUsers extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      deleteId: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRChange = this.handleRChange.bind(this);
  }

  handleRChange(event) {
    this.setState({deleteId: event.target.value});
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8000/user/' + this.state.deleteId, {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => {this.setState({deleteId: ""}); window.location.reload();});
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

        <form onSubmit={this.handleSubmit}>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Type</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key)=> {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.username}</td>
                      <td>{item.type}</td>
                      <td>{item.type!="admin" && <input type="radio" name="radioInput" value={item.id} onChange={this.handleRChange}/>}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
       <br></br>
        <button type="submit" className="btn btn-default">Delete</button>
       </form>
      </div>
    );
  }
}

export default ViewUsers;
