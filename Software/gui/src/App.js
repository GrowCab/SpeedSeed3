import React, { Component } from "react";
import "./App.css";
import DialControl from "./components/DialControl";

class App extends Component {

	fixArrayValues(arr){
		for (let i = 0; i < arr.length; i++) {
			let hourSz = arr[i].end_hour - arr[i].start_hour;
			let minSz = arr[i].end_min - arr[i].start_min;
			arr[i].value = (hourSz*60+minSz)/1440 * 100;
		}
	}

	constructor(props) {
		super(props);
		let t = new Date()
		this.state = {
			devMonitors: "",
			settings: {
				"temperature": [
					{value: 10, max: "10", position:1, start_hour:0, start_min:0, end_hour:8, end_min:0},
					{value: 20, max: "20", position:2, start_hour:8, start_min:0, end_hour:16, end_min:0},
					{value: 30, max: "30", position:3, start_hour:16, start_min:0, end_hour:23, end_min:59},
				],
				"humidity": [
					{value: 10, max: "15", position:0, start_hour:0, start_min:0, end_hour:4, end_min:30},
					{value: 10, max: "20", position:1, start_hour:4, start_min:30, end_hour:9, end_min:0},
					{value: 10, max: "30", position:2, start_hour:9, start_min:0, end_hour:13, end_min:30},
					{value: 10, max: "40", position:3, start_hour:13, start_min:30, end_hour:18, end_min:0},
					{value: 10, max: "50", position:4, start_hour:18, start_min:0, end_hour:23, end_min:59},
				],
				"light": [
					{value: 1, max: "ON",  position:1, start_hour:0, start_min:0, end_hour:12, end_min:0},
					{value: 1, max: "OFF", position:2, start_hour:12, start_min:0, end_hour:23, end_min:59},
				],
			},
			curTime: new Date(),
			arrowAngle: (((t.getHours()*60+t.getMinutes())/1440)*360*Math.PI/180)-Math.PI/2,
		}
	
		this.fixArrayValues(this.state.settings.temperature);
		this.fixArrayValues(this.state.settings.humidity);
		this.fixArrayValues(this.state.settings.light);
		this.pAngle = 0.012;
		this.width = 300;
		this.height = 300;

		this.getItems = this.getItems.bind(this);
		this.getSensors = this.getSensors.bind(this);
		this.getSettings = this.getSettings.bind(this);
	}

	componentDidMount(){
		this.timer = setInterval(()=> this.getItems(), 6000); // Get current state every 1s
		setInterval( () => {
			let t = new Date();
			let stateCopy = this.state;
			stateCopy.curTime = new Date()
			stateCopy.arrowAngle = (((t.getHours()*60+t.getMinutes())/1440)*360*Math.PI/180)-Math.PI/2
			this.setState(stateCopy)
		  },60000); // Get time every 60s 
	}

	getSensors() {
		fetch('/getMonitors')
		.then(res => res.json())
		.then(res => {
			let stateCopy = this.state
			let devMonitors = {}
			devMonitors.temperature = res[0].temperature
			devMonitors.luminance = (res[0].light=="1")?"ON":"OFF"
			devMonitors.humidity = res[0].humidity
			stateCopy.devMonitors = devMonitors
			this.setState(stateCopy)
		})
		.catch(error => console.log("getSensors error:", error));

	}

	getSettings() {
		fetch('/getSettings')
		.then(res => res.json())
		.then(res => {
			console.log(res)
			let stateCopy = this.state
			this.fixArrayValues(res.humidity);
			this.fixArrayValues(res.temperature);
			this.fixArrayValues(res.light);
			stateCopy.settings.humidity = res.humidity;
			stateCopy.settings.temperature = res.temperature;
			stateCopy.settings.light = res.light;
			this.setState(stateCopy)
		})
		.catch(error => console.log("getSettings error:", error));
	}

	getItems() {
		this.getSensors();
		this.getSettings();
	}
	
	componentWillUnmount() {
		this.timer = null;
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">SpeedSeed3</h1>
				</header>
				<p className="App-intro"></p>
				<div >
					<div className="row">
						<div className="col-sm-4">
							<svg height={this.height} width={this.width}>
								<DialControl arrowAngle={this.state.arrowAngle} unit="C" currentValue={this.state.devMonitors.temperature} x={100} y={100} outerRadius={100} innerRadius={50} padAngle={this.pAngle} 
									data={this.state.settings.temperature} min="10" max="30"
								/>
							</svg>
						</div>
						<div className="col-sm-4">
							<svg height={this.height} width={this.width}>
								<DialControl arrowAngle={this.state.arrowAngle} unit="" currentValue={this.state.devMonitors.luminance} x={100} y={100} outerRadius={100} innerRadius={50} padAngle={this.pAngle}
									data={this.state.settings.light} min="0" max="1"
								/>
							</svg>
						</div>
						<div className="col-sm-4">
							<svg height={this.height} width={this.width}>
								<DialControl arrowAngle={this.state.arrowAngle} unit="%" currentValue={this.state.devMonitors.humidity} x={100} y={100} outerRadius={100} innerRadius={50} padAngle={this.pAngle}
									data={this.state.settings.humidity} min="15" max="70"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
