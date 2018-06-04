import React, { Component } from "react";
 
class ConfigForm extends Component {

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
                {this.props.children}
                </div>
        </div>
		);
	}
}
 
export default ConfigForm;
