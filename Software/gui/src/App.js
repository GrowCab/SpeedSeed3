import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DialControl from "./components/DialControl";
import ConfigForm from "./components/ConfigForm";


var xspans = require('xspans')

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			devMonitors: "",
			settings2: {
				// "temperature" : {
				// 	"times": xspans([0,200, 1440]), 
				// 	"values": [21,22],
				// },
			},
			settings: {
				"temperature": [
					{value: 10, label: "-2"},
					{value: 30, label: "16"},
					{value: 80, label: "30"}],
				"humidity": [
					{value: 20, label: "20"},
					{value: 30, label: "25"},
					{value: 45, label: "45"},
					{value: 50, label: "60"}, 	
					{value: 80, label: "40"}],
				"lights": [
					{value: 30, label: "5"},
					{value: 90, label: "100"},
					{value: 100, label: "20"}]
			},
			intervalTest: xspans([{from: 0, to: 1440}]),
			intervalTest2: xspans([{from: 200, to: 400}]),
		}
	
		this.pAngle = 0.012;
		this.width = 300;
		this.height = 300;

		this.getItems = this.getItems.bind(this);
		this.sendSettings = this.sendSettings.bind(this);
	}

	componentDidMount(){
		this.timer = setInterval(()=> this.getItems(), 7000);
		// fetch('/getSettings')
		// .then(res => res.json())
		// .then(settings => this.setState({settings}))
	}
	getItems() {
		fetch('/getMonitors')
		.then(res => res.json())
		.then(devMonitors => this.setState({devMonitors}));
	}
	
	componentWillUnmount() {
		this.timer = null;
	}

	sendSettings() {
		var data= JSON.stringify( this.state.settings );
		console.log(data);
		fetch('/setSettings', {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: data
		})
		.then(function(res){ return res.json(); })
		.then(function(data){ alert( JSON.stringify( data ) ) })
		
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Welcome to SpeedSeed3</h1>
				</header>
				<p className="App-intro"></p>
				<div >
					<div className="row">
						<div className="col-sm-4">
							<svg height={this.height} width={this.width}>
								<DialControl unit="C" currentValue={this.state.devMonitors.temperature} x={100} y={100} outerRadius={100} innerRadius={50} padAngle={this.pAngle} 
									data={this.state.settings.temperature}
								/>
							</svg>
						</div>
						<div className="col-sm-4">
							<svg height={this.height} width={this.width}>
								<DialControl unit="lum" currentValue={this.state.devMonitors.luminance} x={100} y={100} outerRadius={100} innerRadius={50} padAngle={this.pAngle}
									data={this.state.settings.lights}
								/>
							</svg>
						</div>
						<div className="col-sm-4">
							<svg height={this.height} width={this.width}>
								<DialControl unit="%" currentValue={this.state.devMonitors.humidity} x={100} y={100} outerRadius={100} innerRadius={50} padAngle={this.pAngle}
									data={this.state.settings.humidity}
								/>
							</svg>
						</div>
					</div>
				</div>
				<button onClick={this.sendSettings} className="btn btn-primary">Submit</button>
				<ConfigForm/>
			</div>
		);
	}
}

export default App;
