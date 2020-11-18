import React, { Component } from 'react';
import {arc} from 'd3'

class Arc extends Component {
  constructor(props) {
    super(props);
    this.arc = arc();
}

  componentWillMount() {
      this.updateD3(this.props);
  }

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
      <path 
        d={this.arc(this.props.data)}
        style={{fill: this.props.color,}}
      />
  );
  }
}

class DialSetting extends Arc {
    constructor(props) {
        super(props);
        
        switch(props.unit) {
            case "":
                this.title="Edit Illumination"
            break;
            case "C":
                this.title="Edit Temperature"
            break;
            case "%":
                this.title="Edit Humidity"
            break;
            default:
                console.log("unexpected case: " + props.unit)
            break;
        }
    }

  render() {
      let [labelX, labelY] = this.arc.centroid(this.props.data),
          labelTranslate = `translate(${labelX}, ${labelY})`;

      return (
          <g onClick={this.props.onClick.bind(this, this.props)}>
              {super.render()}
              <text transform={labelTranslate}
                    textAnchor="middle">
                        {
                        (this.props.unit!=="")?
                            this.props.data.data.max :
                                (Number(this.props.data.data.max)===1)?
                                    "ON":"OFF"
                                } 
                        {this.props.unit}
              </text>
          </g>
      );
  }
}

export default DialSetting;