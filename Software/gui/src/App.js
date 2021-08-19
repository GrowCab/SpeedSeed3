/*
 * Speeed Seed ^ 3 Frontend
 * 
 *
 * Copyright (c) 2017-2021 John Innes Centre, Earlham Institute, Quadram Instititute.
 * Author     : Luis Yanes, Ricardo H. Ramirez-Gonzalez, Oscar E. Gonzalez-Navarro
 *
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import React, { Component } from "react";
import "./App.css";
import DialControl from "./components/DialControl";
import ConfigForm from "./components/ConfigForm";

class App extends Component {
	doesOverlap(a,b){
		let a_end_time = a.end_hour*100 + a.end_min;
		let a_start_time = a.start_hour*100 + a.start_min;

		let b_end_time = b.end_hour*100 + b.end_min;
		let b_start_time = b.start_hour*100 + b.start_min;
		return (Math.min(a_end_time,b_end_time) >= Math.max(a_start_time,b_start_time));
	}
	
	insertElement(e, data){
	// The interval 0000 - 2359 shall always be complete
	// The new element can be:
	let newData = [];
	let elementToInsert = {
		start_hour: parseInt(e.start.split(":")[0]),
		start_min: parseInt(e.start.split(":")[1]),
		end_hour: parseInt(e.end.split(":")[0]),
		end_min: parseInt(e.end.split(":")[1]),
		max: e.value
	}
	let insertIndex = e.itemIndex;
	console.log("New data to send!\n" + newData);
	console.log("Element to insert!\n" + JSON.stringify(elementToInsert));
	let n = data.length;
	let i = 0;

	// Find lowest index elementToInsert starts before
	while (this.doesOverlap(elementToInsert, data[insertIndex]) && insertIndex > 0){
		insertIndex--;
	}
	let firstIndexOverlapped=insertIndex;

	while(i < firstIndexOverlapped) {
		newData.push(data[i]);
		i++;
	}

	let data_start_time = data[firstIndexOverlapped].start_hour*100+data[firstIndexOverlapped].start_min;
	let ei_start_time = elementToInsert.start_hour * 100 + elementToInsert.start_min;
	if (data_start_time < ei_start_time) {
		newData.push({
			start_hour: data[firstIndexOverlapped].start_hour,
			start_min: data[firstIndexOverlapped].start_min,
			end_hour: elementToInsert.start_hour,
			end_min: elementToInsert.start_min,
			max: data[firstIndexOverlapped].max
		});
	}
	newData.push(elementToInsert);

	insertIndex=e.itemIndex;
	let ei_end_time = elementToInsert.end_hour * 100 + elementToInsert.end_min;
	while(ei_end_time > data[insertIndex].end_hour*100+data[insertIndex].end_min && insertIndex < n) {
		insertIndex++;
	}
	let lastIndexOverlapped=insertIndex;
	let data_end_time = data[lastIndexOverlapped].end_hour*100+data[lastIndexOverlapped].end_min;
	if (data_end_time > ei_end_time){
		newData.push({
			start_hour: elementToInsert.end_hour,
			start_min: elementToInsert.end_min,
			end_hour: data[lastIndexOverlapped].end_hour,
			end_min: data[lastIndexOverlapped].end_min,
			max: data[lastIndexOverlapped].max
		});
	}

	i = lastIndexOverlapped+1;
	while(i < n) {
		newData.push(data[i]);
		if (!this.doesOverlap(elementToInsert, data[i])) break
		i++;
	}
	return newData;
	}

	fixArrayValues(arr){
		let i = 0
		for (i = 0; i < arr.length; i++) {
			let start_time = arr[i].start_time;
			if (start_time == null) {
				start_time = arr[i].start_hour*100+arr[i].start_min
			}
			let end_time = arr[i].end_time;
			if (end_time == null) {
				end_time = arr[i].end_hour*100+arr[i].end_min
			}
			arr[i].value = (end_time-start_time)/1440*100;
		}
	}

	constructor(props) {
		super(props);
		let t = new Date()
		this.state = {
			devMonitors: "",
			isOpen: false,
			powerOff_isOpen: false,
			restart_isOpen: false,
			settings: {
				"temperature": [
					{value: 10, max: 10, position:1, start_hour:0, start_min:0, end_hour:8, end_min:0},
					{value: 20, max: 20, position:2, start_hour:8, start_min:0, end_hour:16, end_min:0},
					{value: 30, max: 30, position:3, start_hour:16, start_min:0, end_hour:23, end_min:59},
				],
				"humidity": [
					{value: 10, max: 15, position:0, start_hour:0, start_min:0, end_hour:4, end_min:30},
					{value: 20, max: 20, position:1, start_hour:4, start_min:30, end_hour:9, end_min:0},
					{value: 30, max: 30, position:2, start_hour:9, start_min:0, end_hour:13, end_min:30},
					{value: 40, max: 40, position:3, start_hour:13, start_min:30, end_hour:18, end_min:0},
					{value: 50, max: 50, position:4, start_hour:18, start_min:0, end_hour:23, end_min:59},
				],
				"light": [
					{value: 1, max: 1,  position:1, start_hour:0, start_min:0, end_hour:12, end_min:0},
					{value: 2, max: 0, position:2, start_hour:12, start_min:0, end_hour:23, end_min:59},
				],
			},
			curTime: new Date(),
			arrowAngle: (((t.getHours()*60+t.getMinutes())/1440)*360*Math.PI/180)-Math.PI/2,
			selectedItem: {
				start: "00:00", end:"23:59", value: 20, unit: "C", label: 20
			}
		}
	
		this.fixArrayValues(this.state.settings.temperature);
		this.fixArrayValues(this.state.settings.humidity);
		this.fixArrayValues(this.state.settings.light);
		this.pAngle = 0.012;
		this.width = 220;
		this.height = 200;

		this.getSensors = this.getSensors.bind(this);
		this.getSettings = this.getSettings.bind(this);
		this.sendSettings = this.sendSettings.bind(this);
		this.getItems = this.getItems.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.openPowerModal = this.openPowerModal.bind(this);
		this.openRestartModal = this.openRestartModal.bind(this);
		this.onChange = this.onChange.bind(this);
		this.startTimeChange = this.startTimeChange.bind(this);
		this.endTimeChange = this.endTimeChange.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.closePowerModal = this.closePowerModal.bind(this);
		this.closeRestartModal = this.closeRestartModal.bind(this);
		this.sendPowerOff = this.sendPowerOff.bind(this);
		this.sendRestart = this.sendRestart.bind(this);
	}

	componentDidMount(){
		this.getSensors();
		this.getSettings();
		this.timer = setInterval(()=> this.getItems(), 10000); // Get current state every 10s
		this.clockTimer = setInterval( () => {
			let t = new Date();
			let stateCopy = this.state;
			stateCopy.curTime = new Date()
			stateCopy.arrowAngle = (((t.getHours()*60+t.getMinutes())/1440)*360*Math.PI/180)-Math.PI/2
			this.setState(stateCopy)
		  },6000); // Get time every 60s 
	}

	getSensors() {
		fetch('/getMonitors')
		.then(res => res.json())
		.then(res => {
			console.log("Monitors: ", res);
			let stateCopy = this.state
			let devMonitors = {}
			devMonitors.temperature = res[0].temperature
			devMonitors.luminance = (res[0].light===1)?"ON":"OFF"
			devMonitors.humidity = res[0].humidity
			stateCopy.devMonitors = devMonitors
			this.setState({devMonitors: {
				temperature: res[0].temperature,
				luminance: (res[0].light===1)?"ON":"OFF",
				humidity: res[0].humidity
			}
			});
		})
		.catch(error => console.log("getSensors error:", error));

	}

	getSettings() {
		fetch('/getSettings')
		.then(res => res.json())
		.then(res => {
			console.log(res);
			let stateCopy = this.state
			this.fixArrayValues(res.humidity);
			this.fixArrayValues(res.temperature);
			this.fixArrayValues(res.light);
			stateCopy.settings.humidity = res.humidity;
			stateCopy.settings.temperature = res.temperature;
			stateCopy.settings.light = res.light;
			this.setState({
				settings: {
					humidity: res.humidity,
					temperature: res.temperature,
					light: res.light
				}
			});
		}).catch(error => console.log("getSettings error:", error));
		console.log(this.state.settings);
	}

	getItems() {
		this.getSensors();
		this.getSettings();
	}
	
	componentWillUnmount() {
		this.timer = null;
		this.clockTimer = null;
	}

	closeModal() {
		this.setState({isOpen: false});
	}

	closePowerModal() {
		this.setState({powerOff_isOpen: false});
	}

	closeRestartModal() {
		this.setState({restart_isOpen: false});
	}

	toggleModal(clickedData, e) {
        this.setState({
          isOpen: !this.state.isOpen
		});

		if (clickedData.data === "undefined") return;
		let endText = "";
		let startText = "";
		let end_time = clickedData.data.data.end_hour*100 + clickedData.data.data.end_min;
		endText += (Math.floor(end_time/100)+"").padStart(2,"0");
		endText += ":";
		endText += (end_time%100+"").padStart(2,"0");

		let start_time = clickedData.data.data.start_hour*100 + clickedData.data.data.start_min;
		startText += (Math.floor(start_time/100)+"").padStart(2,"0");
		startText += ":";
		startText += (start_time%100+"").padStart(2,"0");

		let value = clickedData.data.data.max;
		let max = clickedData.max;
		let min = clickedData.min;
		let label = (clickedData.unit==="")?(clickedData.data.data.max==='1')?"ON":"OFF":clickedData.data.data.max;
		this.setState({
			selectedItem: {
				unit: clickedData.unit,
				itemIndex: clickedData.itemIndex,
				start: startText,
				end: endText,
				value: value,
				label: label,
				min: min,
				max: max,
			}
		});
		console.log(clickedData);
	}
	
	openPowerModal(clickedData, e) {
		this.setState({
			powerOff_isOpen: !this.state.powerOff_isOpen
		});

	}

	openRestartModal(clickedData, e) {
		this.setState({
			restart_isOpen: !this.state.restart_isOpen
		});

	}

	sendPowerOff(e) {
		e.preventDefault();
		// Choose whether it's power off or reset.
		fetch('/powerOff')
		.then(function(res){ return res.json();})
		.then(function(data){console.log(JSON.stringify(data))})
		.catch(error => console.log("power error: ", error));

		this.setState({
			powerOff_isOpen: false
		})
	}

	sendRestart(e) {
		e.preventDefault();

		// Choose whether it's power off or reset.
		fetch('/restart')
		.then(function(res){ return res.json();})
		.then(function(data){console.log(JSON.stringify(data))})
		.catch(error => console.log("reboot error: ", error));
		

		this.setState({
			restart_isOpen: false
		})
	}

	sendSettings(e) {
		e.preventDefault();
		console.log("Data to send");
		console.log(this.state.selectedItem);

		let dataToSend = this.state.settings;
		// Decide on which array the data goes
		switch(this.state.selectedItem.unit){
			case "":
			dataToSend.light=this.insertElement(this.state.selectedItem, this.state.settings.light);
			break;
			case "C":
			dataToSend.temperature=this.insertElement(this.state.selectedItem, this.state.settings.temperature);
			break;
			case "%":
			dataToSend.humidity=this.insertElement(this.state.selectedItem, this.state.settings.humidity);
			break;
			default:
				console.log("Unknown control unit");
			break;
		}

		var data = JSON.stringify(dataToSend);
		console.log("The data to send: " + data);
		fetch('/setSettings', {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: data
		})
		.then(function(res){ return res.json(); })
        .then(function(data){ console.log( JSON.stringify( data ) ) })
		.catch(error => console.log("sendSettings error: ", error));
		this.setState({
			isOpen: !this.state.isOpen
		});
		this.getSettings();
	}

	startTimeChange(event) {
        // If the unit is "" it means illumination so the labe and only
        // ever be either "ON" or "OFF", sorry for the hack (ternary inside ternary)		
		let newState = this.state;
		newState.selectedItem.start = event.target.value;
		this.setState(newState);
	}

	endTimeChange(event) {
        // If the unit is "" it means illumination so the labe and only
        // ever be either "ON" or "OFF", sorry for the hack (ternary inside ternary)		
		let newState = this.state;
		newState.selectedItem.end = event.target.value;
		this.setState(newState);
	}

	onChange(event) {
        // If the unit is "" it means illumination so the labe and only
		// ever be either "ON" or "OFF", sorry for the hack (ternary inside ternary)
        let val = (!this.state.selectedItem.unit)?
                (event.target.value==='0')?"OFF":"ON" :
				event.target.value;

		this.setState({
			selectedItem: {
				...this.state.selectedItem,
				value: event.target.value,
				label: val
			}
		})
	}
	
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">GrowCab</h1>
				</header>
				<p className="App-intro"></p>
				<div >
					<div >
						<div style={{verticalAlign: "centre"}}>
							<svg height={this.height} width={this.width}>
								<DialControl arrowAngle={this.state.arrowAngle} unit="C" currentValue={this.state.devMonitors.temperature} x={100} y={100} outerRadius={100} innerRadius={50} padAngle={this.pAngle} 
									data={this.state.settings.temperature} min="10" max="30" onClick={this.toggleModal}
								/>
							</svg>
							<svg height={this.height} width={this.width}>
								<DialControl arrowAngle={this.state.arrowAngle} unit="" currentValue={this.state.devMonitors.luminance} x={100} y={100} outerRadius={100} innerRadius={50} padAngle={this.pAngle}
									data={this.state.settings.light} min="0" max="1" onClick={this.toggleModal}
								/>
							</svg>
							<svg height={this.height} width={this.width}>
								<DialControl arrowAngle={this.state.arrowAngle} unit="%" currentValue={this.state.devMonitors.humidity} x={100} y={100} outerRadius={100} innerRadius={50} padAngle={this.pAngle}
									data={this.state.settings.humidity} min="15" max="70" onClick={this.toggleModal}
								/>
							</svg>
						</div>
					</div>
				</div>
				<ConfigForm show={this.state.isOpen}
				sendSettings={this.sendSettings}
				closeModal={this.closeModal}
				onChange={this.onChange}
				selectedItem={this.state.selectedItem}
				startTimeChange={this.startTimeChange}
				endTimeChange={this.endTimeChange}>
        		</ConfigForm>
				<div >
					<ConfigForm show={this.state.powerOff_isOpen}>
						<div>
							<p>Please confirm you want to shutdown the device</p>
							<button onClick={this.sendPowerOff}>Accept</button>
							<button onClick={this.closePowerModal}>Close</button>
						</div>
					</ConfigForm>
					<ConfigForm show={this.state.restart_isOpen}>
						<div>
							<p>Please confirm you want to Restart the device</p>
							<button onClick={this.sendRestart}>Accept</button>
							<button onClick={this.closeRestartModal}>Close</button>
						</div>
					</ConfigForm>
					<button onClick={this.openPowerModal}>Power Off</button>
					<button onClick={this.openRestartModal}>Reset</button>
				</div>
			</div>
		);
	}
}

export default App;
