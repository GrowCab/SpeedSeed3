import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ArcChart from './ArcChart'
import TemperatureDial from './components/TemperatureDial'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to SpeedSeed3</h1>
        </header>
        <p className="App-intro">
        </p>
        <div >
        <div class="row">
  <div class="col-sm-4">
  <svg 
          height="200" width="200"><TemperatureDial x={100} y={100} outerRadius={100} innerRadius={50} 
          data={
            [
              {value: 10, label: '-2 C'},
              {value: 30, label: '16 C'},
              {value: 80, label: '30 C'}
            ]
            }
          />
        </svg>
  </div>
  <div class="col-sm-4">
  <svg 
          height="200" width="200"><TemperatureDial x={100} y={100} outerRadius={100} innerRadius={50} 
          data={
            [
              {value: 10, label: '-2 C'},
              {value: 30, label: '16 C'},
              {value: 80, label: '30 C'}
            ]
            }
          />
        </svg>
</div>
  <div class="col-sm-4">
  <svg 
          height="200" width="200"><TemperatureDial x={100} y={100} outerRadius={100} innerRadius={50} 
          data={
            [
              {value: 10, label: '-2 C'},
              {value: 30, label: '16 C'},
              {value: 80, label: '30 C'}
            ]
            }
          />
        </svg>
</div>
</div>
        </div>
        <div padding-top="20">
        <label>
          From:
        <input type="text"></input>
        </label>
        <label>
          To:
        <input type="text"></input>
        </label>
        <label>
          Temperature:
        <input type="text"></input>
        </label>
        <button>Submit</button>
        </div>
      </div>
    );
  }
}

export default App;
