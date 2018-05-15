import React, { Component } from 'react';
import Modal from 'react-modal';
import ConfigForm from "../ConfigForm";
import {arc} from 'd3'

const customStyles = {
	content : {
	  top                   : '50%',
	  left                  : '50%',
	  right                 : 'auto',
	  bottom                : 'auto',
	  marginRight           : '-50%',
	  transform             : 'translate(-50%, -50%)'
	}
  };

class Arc extends Component {
  constructor() {
    super();
    this.arc = arc();  }

  componentWillMount() {
      this.updateD3(this.props);
  }1

  componentWillReceiveProps(newProps) {
      this.updateD3(newProps);
  }

  updateD3(newProps) {
    this.arc.innerRadius(newProps.innerRadius);
    this.arc.outerRadius(newProps.outerRadius);
    this.arc.cornerRadius(newProps.cornerRadius);
    this.arc.padAngle(newProps.padAngle);
    }

  render() {
    return (
      <path d={this.arc(this.props.data)}
            style={
                {
                    fill: this.props.color,
                    border: "red"}
                }
      />
  );
  }
}

class DialSetting extends Arc {
    constructor(props) {
        super(props);
        this.state = {
            flipped: null,
            modalIsOpen: false,
        };

        this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);	  

    }
    
    mouseOver() {
        console.log("Mouse over!!");
        this.setState({flipped:false});
        this.updateD3({
            padAngle:this.props.padAngle,
            cornerRadius:this.props.cornerRadius,
            innerRadius:this.props.innerRadius,
            outerRadius:this.props.outerRadius+0.1*this.props.outerRadius
        });
    }
    mouseOut() {
        console.log("Mouse out!!");
        this.setState({flipped:false});
        this.updateD3({
            padAngle:this.props.padAngle,
            cornerRadius:this.props.cornerRadius,
            innerRadius:this.props.innerRadius,
            outerRadius:this.props.outerRadius});            
    }

    openModal() {
		this.setState({modalIsOpen: true});
	  }
	
	  afterOpenModal() {
		// references are now sync'd and can be accessed.
	  }
	
	  closeModal() {
		this.setState({modalIsOpen: false});
	  }
	
  render() {
      let [labelX, labelY] = this.arc.centroid(this.props.data),
          labelTranslate = `translate(${labelX}, ${labelY})`;

      return (
          <g onClick={this.openModal}>
              <Modal 
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                    <h2 ref={subtitle => this.subtitle = subtitle}>Input form</h2>
                    <ConfigForm onClick={this.closeModal} 
                        value={this.props.data.data.label} 
                        start={this.props.data.data.start} 
                        end={this.props.data.data.end}
                        min={this.props.min}
                        max={this.props.max}
                        unit={this.props.unit}/>
            </Modal>
              {super.render()}
              <text transform={labelTranslate}
                    textAnchor="middle">
                  {this.props.data.data.label} {this.props.unit}
              </text>
          </g>
      );
  }
}

export default DialSetting;