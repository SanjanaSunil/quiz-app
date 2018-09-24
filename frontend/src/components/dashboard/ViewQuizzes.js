import React, { Component } from 'react';
import './ViewUsers.css';
import EditQuiz from './EditQuiz';

class ViewQuizzes extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      admin: [],
      genre_id: 0,
      quiz: [],
      clicked: false
    }
    this.editQuiz = this.editQuiz.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8000/genres', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })
      .then(response => response.json())
      .then(data => this.setState({data: data}));

      fetch('http://localhost:8000/type', {
      method: 'GET',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(admin => this.setState({admin: admin}));
  }

  editQuiz(event) {
    this.setState({genre_id: event.target.value});
    this.setState({clicked: true});
  }

  render() {
    return (
      <div>
        {
          this.state.clicked && <EditQuiz genre_id={this.state.genre_id}/>
        }
      {!this.state.clicked &&
      <div className="App">
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Topic</th>
              {this.state.admin.type==="admin" && <th>Edit</th>}
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key)=> {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.genre}</td>
                      {this.state.admin.type==="admin" && 
                        <td><button type="submit" className="btn btn-success btn-md" onClick={this.editQuiz} value={item.id}>Edit</button></td>
                      }
                  </tr>
                )
             })}
          </tbody>
       </table>
       <br></br>
      </div>
      }
      </div>
    );
  }
}

export default ViewQuizzes;
