import React, { Component } from 'react';

import {arc} from 'd3'

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
            style={{fill: this.props.color}}></path>
  );
  }
}

class DialSetting extends Arc {
    constructor(props) {
        super(props);
        this.state = {flipped: null};
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
  render() {
      let [labelX, labelY] = this.arc.centroid(this.props.data),
          labelTranslate = `translate(${labelX}, ${labelY})`;

      return (
          <g onMouseOver={()=> this.mouseOver()} onMouseOut={()=>this.mouseOut()}>
              {super.render()}
              <text transform={labelTranslate}
                    textAnchor="middle">
                  {this.props.data.data.label}
              </text>
          </g>
      );
  }
}

export default DialSetting ;