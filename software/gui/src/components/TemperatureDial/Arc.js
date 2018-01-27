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
    }

  render() {
    return (
      <path d={this.arc(this.props.data)}
            style={{fill: this.props.color}}></path>
  );
  }
}

class TemperatureSetting extends Arc {
  render() {
      let [labelX, labelY] = this.arc.centroid(this.props.data),
          labelTranslate = `translate(${labelX}, ${labelY})`;

      return (
          <g>
              {super.render()}
              <text transform={labelTranslate}
                    textAnchor="middle">
                  {this.props.data.data.label}
              </text>
          </g>
      );
  }
}

export default TemperatureSetting ;