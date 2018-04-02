// ./src/components/Piechart/index.jsx
 
import React, { Component } from "react";
import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
 
class ConfigForm extends Component {
	constructor() {
		super();
	}

	render() {
		return (
        <div className="float-left">
            <form padding-top="20">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="fromInput">From:</label>
                    <div className="col-sm-10">
                        <TimePicker colorPalette="dark"  minuteStep={1}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"  htmlFor="toInput">To:</label>
                    <div className="col-sm-10">
                        <TimePicker colorPalette="dark" theme="classic" minuteStep={15}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="valueInput">Value:</label>
                    <div className="col-sm-10">
                        <input id="valueInput" className="form-control" type="text"></input>
                    </div>
                </div>
            </form>
        </div>
		);
	}
}
 
export default ConfigForm;
