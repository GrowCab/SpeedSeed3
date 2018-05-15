import React, { Component } from "react";
 
class ConfigForm extends Component {
	constructor(props) {
        super(props);
        let val = (props.unit==="")?(props.label==="OFF")?'0':'1':props.label;
        this.state = {
            value: val,
            label: props.label,
        };
        this.sendSettings = this.sendSettings.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    
    onChange(event) {
        // If the unit is "" it means illumination so the labe and only
        // ever be either "ON" or "OFF", sorry for the hack (ternary inside ternary)
        let val = (this.props.unit==="")?
                (event.target.value==="0")?"OFF":"ON" :
                event.target.value;
        this.setState({
            value: event.target.value,
            label: val
        });
    }

    sendSettings() {
        console.log("Is this happenning?")
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
    render() {
		return (
        <div className="float-left">
            <form padding-top="20">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="fromInput">From:</label>
                    <div className="col-sm-10">
                    <input type="time" defaultValue={this.props.start}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"  htmlFor="toInput">To:</label>
                    <div className="col-sm-10">
                    <input type="time" defaultValue={this.props.end}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="valueInput">{this.props.unit}</label>
                    <div className="col-sm-10">
                        <input id="valueInput" type="range"
                            value={this.state.value}
                            min={this.props.min} max={this.props.max} 
                            onChange={this.onChange}
                        />
                        <label>{this.state.label}</label>
                    </div>
                    <button onClick={this.sendSettings} className="btn btn-primary">Save</button>
                    <button onClick={this.closeModal} className="btn btn-primary">Close</button>
                </div>
            </form>
        </div>
		);
	}
}
 
export default ConfigForm;
