import React, { Component } from 'react';
import ViewUsers from './ViewUsers';
import ViewQuizzes from './ViewQuizzes';
import CreateQuiz from './CreateQuiz';
import Leaderboard from './Leaderboard';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ViewScores from './ViewScores';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      admin: []
    }
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8000/user', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })
      .then(response =>
        //if(response.status === 200)
          // console.log(response.status);
          response.json())
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

  logout (event) {
    event.preventDefault();
    fetch('http://localhost:8000/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if(response.status >= 200 && response.status < 300) {
                window.location = 'http://localhost:3000'
            }
        });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Qureka {this.state.data.username}</h1>
        </header>
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                  </div>
                  <ul className="nav navbar-nav">
                    {this.state.admin.type==="admin" && 
                      <li><Link to={'/ViewUsers'}>View Users</Link></li>
                    }
                    <li><Link to={'/ViewQuizzes'}>Quizzes</Link></li>
                    <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                    {this.state.admin.type==="admin" && 
                      <li><Link to={'/CreateQuiz'}>Create A Quiz</Link></li>
                    }
                    {this.state.admin.type!=="admin" &&
                        <li><Link to={'/ViewScores'}>View scores</Link></li>
                    }
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    <li><button onClick={this.logout} className="btn btn-danger btn-lg btn-login btn-block">Log out</button></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                {this.state.admin.type==="admin" && 
                    <Route exact path='/ViewUsers' component={ViewUsers} />
                  }
                {this.state.admin.type==="admin" &&
                    <Route exact path='/CreateQuiz' component={CreateQuiz} />
                }
                <Route exact path='/ViewQuizzes' component={ViewQuizzes} />
                <Route exact path='/Leaderboard' component={Leaderboard} />
                {this.state.admin.type!=="admin" &&
                        <Route exact path='/ViewScores' render={(props) => <ViewScores {...props} data={this.state.data} />} />
                }
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default Dashboard;
