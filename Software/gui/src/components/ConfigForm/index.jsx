import React, { Component } from "react";
 
class ConfigForm extends Component {
    constructor(props) {
      super(props);
      }
   

    render() {
        if(!this.props.show) {
            return null;
          }
    // The gray background
    const backdropStyle = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 50
      };
  
      // The modal "window"
      const modalStyle = {
        backgroundColor: '#fff',
        borderRadius: 5,
        maxWidth: "60%",
        minHeight: 300,
        alignItems: "centre",
        verticalAlign: "middle",
        maxHeight: "20%",
        display: "block",
        margin: "auto",
        padding: 30
      };
    
		return (
            <div className="backdrop" style={backdropStyle}>
                <div className="modal" style={modalStyle}>
					<div className="float-left">
						<form padding-top="20" vertical-align="center" top="50%">
							<div className="form-group row">
								<label className="col-sm-2 col-form-label" htmlFor="fromInput">From:</label>
								<div className="col-sm-10">
								<input disabled={true} type="time" defaultValue={this.props.selectedItem.start} value={this.props.selectedItem.start} onChange={this.props.startTimeChange}/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label"  htmlFor="toInput">To:</label>
								<div className="col-sm-10">
								<input type="time" defaultValue={this.props.selectedItem.end} onChange={this.props.endTimeChange}/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label" htmlFor="valueInput">{this.props.selectedItem.unit}</label>
								<div className="col-sm-10">
									<input id="valueInput" type="range"
										value={this.props.selectedItem.value}
                    min={this.props.selectedItem.min} max={this.props.selectedItem.max} 
                    onInput={this.props.onChange}
									/>
									<label>{this.props.selectedItem.label}</label>
								</div>
							</div>
							<button onClick={this.props.sendSettings} className="btn btn-primary">Save</button>
							<button onClick={this.props.closeModal} className="btn btn-primary">Close</button>
						</form>
					</div>

                </div>
        </div>

        
		);
	}
}
 
export default ConfigForm;
