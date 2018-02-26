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
        <div class="float-left">
            <form padding-top="20">
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label" for="fromInput">From:</label>
                    <div class="col-sm-10">
                        <TimePicker colorPalette="dark"  minuteStep={1}/>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label"  for="toInput">To:</label>
                    <div class="col-sm-10">
                        <TimePicker colorPalette="dark" theme="classic" minuteStep={15}/>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label" for="valueInput">Value:</label>
                    <div class="col-sm-10">
                        <input id="valueInput" class="form-control" type="text"></input>
                    </div>
                </div>
            </form>
        </div>
		);
	}
}
 
export default ConfigForm;
