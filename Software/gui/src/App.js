import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DialControl from "./components/DialControl";

class App extends Component {
	constructor(props) {
		super(props);
		let t = new Date()
		this.state = {
			devMonitors: "",
			settings: {
				"temperature": [
					{value: 10, label: "10", position:1, start:"00:00", end:"08:00"},
					{value: 20, label: "20", position:2, start:"08:00", end:"16:00"},
					{value: 30, label: "30", position:3, start:"16:00", end:"23:59"},
				],
				"humidity": [
					{value: 10, label: "15", position:0, start:"00:00", end:"04:30"},
					{value: 10, label: "20", position:1, start:"04:30", end:"09:00"},
					{value: 10, label: "30", position:2, start:"09:00", end:"13:30"},
					{value: 10, label: "40", position:3, start:"13:30", end:"18:00"},
					{value: 10, label: "50", position:4, start:"18:00", end:"23:59"},
				],
				"lights": [
					{value: 1, label: "ON", position:1, start:"00:00", end:"12:00"},
					{value: 1, label: "OFF", position:2, start:"12:00", end:"23:59"},
				],
			},
			curTime: new Date(),
			arrowAngle: (((t.getHours()*60+t.getMinutes())/1440)*360*Math.PI/180)-Math.PI/2,
		}
	
		this.pAngle = 0.012;
		this.width = 300;
		this.height = 300;

		this.getItems = this.getItems.bind(this);
	}

	componentDidMount(){
		this.timer = setInterval(()=> this.getItems(), 7000);
		setInterval( () => {
			let t = new Date();
			let stateCopy = this.state;
			stateCopy.curTime = new Date()
			stateCopy.arrowAngle = (((t.getHours()*60+t.getMinutes())/1440)*360*Math.PI/180)-Math.PI/2
			this.setState(stateCopy)
		  },6000); // Get time every minute 
	}
	getItems() {
		fetch('/getMonitors')
		.then(res => res.json())
		.then(devMonitors => {
			let stateCopy = this.state
			stateCopy.devMonitors = devMonitors
			this.setState(stateCopy)
		})
		.catch(error => console.log("getItems error:", error));
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
									data={this.state.settings.lights} min="0" max="1"
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
