import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {data: []}
  }

  componentDidMount(){
    axios.get("YOURENDPOINTURL").then(response => {
      this.setState({data: response.data})
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Plantronics Global Device Hub</h1>
        </header>
      </div>
    );
  }
}

export default App;