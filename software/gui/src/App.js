import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ArcChart from './ArcChart'
import DialControl from './components/DialControl'

class App extends Component {
  constructor(props) {
    super(props);
    this.pAngle = 0.008;
  }
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
          height="200" width="200"><DialControl currentValue="Temperature" x={100} y={100} outerRadius={100} innerRadius={50} padAngle={this.pAngle} 
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
          height="200" width="200"><DialControl currentValue="Illumination" x={100} y={100} outerRadius={100} innerRadius={50} padAngle={this.pAngle}
          data={
            [
              {value: 30, label: '5 lum'},
              {value: 90, label: '100 lum'},
              {value: 100, label: '20 lum'}
            ]
            }
          />
        </svg>
</div>
  <div class="col-sm-4">
  <svg 
          height="200" width="200"><DialControl currentValue="Humidity" x={100} y={100} outerRadius={100} innerRadius={50} padAngle={this.pAngle}
          data={
            [
              {value: 20, label: '20 %'},
              {value: 30, label: '25 %'},
              {value: 45, label: '45 %'},
              {value: 50, label: '60 %'},
              {value: 80, label: '40 %'}
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
          Value:
        <input type="text"></input>
        </label>
        <button>Submit</button>
        </div>
      </div>
    );
  }
}

export default App;
