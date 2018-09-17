import React, { Component } from 'react';

class LoggedIn extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      quiztopics: []
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/api/topics');
    fetch(request)
      .then(response => response.json())
        .then(quiztopics => this.setState({quiztopics: quiztopics}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Qureka</h1>
        </header>
        <div className="container">
        <span className="pull-right"><a onClick={this.logout}>Log out</a></span>
        <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
        {this.state.quiztopics.map(function(item, key) {
          return (
            <tr key = {key}>
                <td>{item.id}</td>
                <td>{item.followers}</td>
                <td>{item.topic}</td>
            </tr>
          )
        })}
        </div>
      </div>
      </div>
    );
  }
}

export default LoggedIn;
