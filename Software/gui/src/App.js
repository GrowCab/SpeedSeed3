import React, { Component } from "react";
import "./App.css";
import DialControl from "./components/DialControl";
import ConfigForm from "./components/ConfigForm";

class App extends Component {
	doesOverlap(a,b){
		return (Math.min(a.end_time,b.end_time) >= Math.max(a.start_time,b.start_time));
	}
	
	addMinute(a){
		if ((a%100)/59 >= 1){
			a=Math.floor(a/100)*100+100;
			if (a > 2359) {
				a = 2359
			}
		} else {
			a=a+1;
		}
		return a;
	}

	delMinute(a) {
		return a%100==0?(a-41<0)?0:a-41:a-1;
	}
	
	insertElement(e, data){
	// The interval 0000 - 2359 shall always be complete
	// The new element can be:
	let newData = [];
	let elementToInsert = {
		start_time: e.start.split(":")[0]*100+parseInt(e.start.split(":")[1]),
		end_time: e.end.split(":")[0]*100+parseInt(e.end.split(":")[1]),
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

	if (data[firstIndexOverlapped].start_time < elementToInsert.start_time) {
		newData.push({
			start_time: data[firstIndexOverlapped].start_time,
			end_time: this.delMinute(elementToInsert.start_time),
			max: data[firstIndexOverlapped].max
		});
	}
	newData.push(elementToInsert);

	insertIndex=e.itemIndex;
	while(elementToInsert.end_time > data[insertIndex].end_time && insertIndex < n) {
		insertIndex++;
	}
	let lastIndexOverlapped=insertIndex;

	if (data[lastIndexOverlapped].end_time > elementToInsert.end_time){
		newData.push({
			start_time: this.addMinute(elementToInsert.end_time),
			end_time: data[lastIndexOverlapped].end_time,
			max: data[lastIndexOverlapped].max
		});
	}

	i = lastIndexOverlapped+1;
	while(i < n && !this.doesOverlap(elementToInsert, data[i])) {
		newData.push(data[i]);
		i++;
	}

	return newData;
	}

	fixArrayValues(arr){
		let i = 0
		for (i = 0; i < arr.length; i++) {
			arr[i].value = (arr[i].end_time-arr[i].start_time)/1440*100;
		}
	}

	constructor(props) {
		super(props);
		let t = new Date()
		this.state = {
			devMonitors: "",
			isOpen: false,
			settings: {
				"temperature": [
					{value: 10, max: 10, position:1, start_hour:0, start_min:0, end_hour:8, end_min:0},
					{value: 20, max: 20, position:2, start_hour:8, start_min:0, end_hour:16, end_min:0},
					{value: 30, max: 30, position:3, start_hour:16, start_min:0, end_hour:23, end_min:59},
				],
				"humidity": [
					{value: 10, max: 15, position:0, start_hour:0, start_min:0, end_hour:4, end_min:30},
					{value: 10, max: 20, position:1, start_hour:4, start_min:30, end_hour:9, end_min:0},
					{value: 10, max: 30, position:2, start_hour:9, start_min:0, end_hour:13, end_min:30},
					{value: 10, max: 40, position:3, start_hour:13, start_min:30, end_hour:18, end_min:0},
					{value: 10, max: 50, position:4, start_hour:18, start_min:0, end_hour:23, end_min:59},
				],
				"light": [
					{value: 1, max: 1,  position:1, start_hour:0, start_min:0, end_hour:12, end_min:0},
					{value: 1, max: 0, position:2, start_hour:12, start_min:0, end_hour:23, end_min:59},
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
		this.onChange = this.onChange.bind(this);
		this.startTimeChange = this.startTimeChange.bind(this);
		this.endTimeChange = this.endTimeChange.bind(this);
		this.closeModal = this.closeModal.bind(this);
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
			let stateCopy = this.state
			let devMonitors = {}
			devMonitors.temperature = res[0].temperature
			devMonitors.luminance = (res[0].light==="1")?"ON":"OFF"
			devMonitors.humidity = res[0].humidity
			stateCopy.devMonitors = devMonitors
			this.setState({devMonitors: {
				temperature: res[0].temperature,
				luminance: (res[0].light==="1")?"ON":"OFF",
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
	toggleModal(clickedData, e) {
        this.setState({
          isOpen: !this.state.isOpen
		});

		if (clickedData.data === "undefined") return;
		let endText = "";
		let startText = "";
		endText += (Math.floor(clickedData.data.data.end_time/100)+"").padStart(2,"0");
		endText += ":";
		endText += (clickedData.data.data.end_time%100+"").padStart(2,"0");

		startText += (Math.floor(clickedData.data.data.start_time/100)+"").padStart(2,"0");
		startText += ":";
		startText += (clickedData.data.data.start_time%100+"").padStart(2,"0");

		let value = clickedData.data.data.max;
		let max = clickedData.max;
		let min = clickedData.min;
		let label = (clickedData.unit==="")?(clickedData.data.data.max===0)?"OFF":"ON":clickedData.data.data.max;
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
			this.setState({todo:"nada"});
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
        let val = (this.state.selectedItem.unit==="")?
                (event.target.value==="0")?"OFF":"ON" :
				event.target.value;
		
		let newState = this.state;
		newState.selectedItem.value = event.target.value;
		newState.selectedItem.label = val;
		this.setState(newState);
	}
	
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">SpeedSeed3</h1>
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
				<ConfigForm
            		show={this.state.isOpen}>
					<div className="float-left">
						<form padding-top="20" vertical-align="center" top="50%">
							<div className="form-group row">
								<label className="col-sm-2 col-form-label" htmlFor="fromInput">From:</label>
								<div className="col-sm-10">
								<input type="time" defaultValue={this.state.selectedItem.start} onChange={this.startTimeChange}/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label"  htmlFor="toInput">To:</label>
								<div className="col-sm-10">
								<input type="time" defaultValue={this.state.selectedItem.end} onChange={this.endTimeChange}/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label" htmlFor="valueInput">{this.state.selectedItem.unit}</label>
								<div className="col-sm-10">
									<input id="valueInput" type="range"
										value={this.state.selectedItem.value}
										min={this.state.selectedItem.min} max={this.state.selectedItem.max} 
										onChange={this.onChange}
									/>
									<label>{this.state.selectedItem.label}</label>
								</div>
							</div>
							<button onClick={this.sendSettings} className="btn btn-primary">Save</button>
							<button onClick={this.closeModal} className="btn btn-primary">Close</button>
						</form>
					</div>
        		</ConfigForm>

			</div>
		);
	}
}

export default App;
