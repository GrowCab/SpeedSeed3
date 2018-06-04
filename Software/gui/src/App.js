import React, { Component } from "react";
import "./App.css";
import DialControl from "./components/DialControl";
import ConfigForm from "./components/ConfigForm";

class App extends Component {

	insertElement(element, data){
		// Modify the values of the intervals in data with new element
		// Find overlapped elements, just under, included in new element and just above new element

		let beg_bf_end_bf=[]
		let beg_af_end_af=[]

		let overlapped=[]
		let beg_af_end_bf=[]
		let end = 100*element.end_hour+element.end_min;
		let start = 100*element.start_hour+element.start_min;
		for (let i = 0; i < data.length; i++){
			let o = {}
			o.end = 100*data[i].end_hour+data[i].end_min;
			o.start = 100*data[i].start_hour+data[i].start_min;

			if (start <= o.start) {
				if (end < o.start){
					//OUT, is before
				} else { // end > o.start
					if (end >= o.end) {
						// Overlap total
						overlapped.push(i);
					} else { // end < o.end
						// begins before, ends before
						beg_bf_end_bf.push(i);
					}
				}
			} else { // start > o.start
				if (end <= o.end) {
					// Begins after, ends before
					beg_af_end_bf.push(i);
				} else { // end > o.end
					if (start < o.end) {
						// Begins after, ends after
						beg_af_end_af.push(i);
					} else { // start > o.end
						// OUT, is after
					}
				}
			}
		}

		// Fix array to place new element

		if (beg_af_end_bf.length < 1){
			let insertPosition = beg_af_end_af[0];
			for (let i = 0; i < beg_bf_end_bf.length; i++){
				data[beg_af_end_af[i]].start_hour = element.start_hour;
				data[beg_af_end_af[i]].start_min = element.start_min;			
			}
			for (let i = 0; i < beg_af_end_af.length; i++){
				data[beg_af_end_af[i]].end_hour = element.end_hour;
				data[beg_af_end_af[i]].end_min = element.end_min;
			}
			data.splice(insertPosition, overlapped.length, element);
		} else {

			data.splice(beg_af_end_bf[0]+1, 0, element);
			data[beg_af_end_bf[0]].end_hour = element.start_hour;
			data[beg_af_end_bf[0]].end_min = element.start_min;
			data[beg_af_end_bf[0]+2].start_hour = element.end_hour;
			data[beg_af_end_bf[0]+2].start_min = element.end_min;

		}

	}

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
		this.width = 300;
		this.height = 300;

		this.getItems = this.getItems.bind(this);
		this.getSensors = this.getSensors.bind(this);
		this.getSettings = this.getSettings.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.onChange = this.onChange.bind(this);
		this.sendSettings = this.sendSettings.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	componentDidMount(){
		this.getSensors();
		this.getSettings();
		this.timer = setInterval(()=> this.getItems(), 10000); // Get current state every 10s
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
			devMonitors.luminance = (res[0].light==="1")?"ON":"OFF"
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

	closeModal() {
		this.setState({isOpen: false});
	}
	toggleModal(clickedData, e) {
        this.setState({
          isOpen: !this.state.isOpen
		});

		if (clickedData.data === "undefined") return;
		let endText = ("0" + clickedData.data.data.end_hour).slice(-2)+":"+("0" + clickedData.data.data.end_min).slice(-2);
		let startText = ("0" + clickedData.data.data.start_hour).slice(-2)+":"+("0" + clickedData.data.data.start_min).slice(-2);
		let value = clickedData.data.data.max;
		let max = clickedData.max;
		let min = clickedData.min;
		let label = (clickedData.unit==="")?(clickedData.data.data.max===0)?"OFF":"ON":clickedData.data.data.max;
		let start_hour = clickedData.data.data.start_hour;
		let start_min = clickedData.data.data.start_min;
		let end_hour = clickedData.data.data.end_hour;
		let end_min = clickedData.data.data.end_min;
		this.setState({
			selectedItem: {
				unit: clickedData.unit,
				start: startText,
				end: endText,
				value: value,
				label: label,
				min: min,
				max: max,
				start_hour: start_hour,
				start_min: start_min,
				end_hour: end_hour,
				end_min: end_min,
			}
		});
		console.log(clickedData);
    }
	
	sendSettings(e) {
		console.log("Data to send");
		console.log(this.state.selectedItem);

		// Decide on which array the data goes
		switch(this.state.selectedItem.unit){
			case "":
				this.insertElement(this.state.selectedItem, this.state.settings.light);
			break;
			case "C":
				this.insertElement(this.state.selectedItem, this.state.settings.temperature);
			break;
			case "%":
				this.insertElement(this.state.selectedItem, this.state.settings.humidity);
			break;
			default:
				console.log("Unknown control unit");
			break;
		}

		var data= JSON.stringify( this.state.settings );
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
					<div className="row">
						<div className="col-sm-4">
							<svg height={this.height} width={this.width}>
								<DialControl arrowAngle={this.state.arrowAngle} unit="C" currentValue={this.state.devMonitors.temperature} x={100} y={100} outerRadius={100} innerRadius={50} padAngle={this.pAngle} 
									data={this.state.settings.temperature} min="10" max="30" onClick={this.toggleModal}
								/>
							</svg>
						</div>
						<div className="col-sm-4">
							<svg height={this.height} width={this.width}>
								<DialControl arrowAngle={this.state.arrowAngle} unit="" currentValue={this.state.devMonitors.luminance} x={100} y={100} outerRadius={100} innerRadius={50} padAngle={this.pAngle}
									data={this.state.settings.light} min="0" max="1" onClick={this.toggleModal}
								/>
							</svg>
						</div>
						<div className="col-sm-4">
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
								<input type="time" defaultValue={this.state.selectedItem.start}/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label"  htmlFor="toInput">To:</label>
								<div className="col-sm-10">
								<input type="time" defaultValue={this.state.selectedItem.end}/>
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
