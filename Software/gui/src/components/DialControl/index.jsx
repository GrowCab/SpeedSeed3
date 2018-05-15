import React, { Component } from "react";
import { pie } from "d3";
import * as scale  from "d3-scale";
import DialSetting  from "../Arc";
 
class DialControl extends Component {
	constructor(props) {
		super(props);
		this.pie = pie().value((d) => d.value).sort(null);
		this.colors = scale.scaleOrdinal(scale.schemeCategory20);
	}

	arcGenerator(d, u, i) {
		return (
			<DialSetting key={`arc-${i}`}
				data={d}
				unit={u}
				min={this.props.min}
				max={this.props.max}
				innerRadius={this.props.innerRadius}
				outerRadius={this.props.outerRadius}
				padAngle={this.props.padAngle}
				color={this.colors(i)} />
		);
	}

	render() {
		let pie = this.pie(this.props.data);
		let translate = `translate(${this.props.x}, ${this.props.y})`;
		return (
			// Generate all the arcs (value divisions)
			// Add the current value in the middle
			// Point at the value that should be
			<g transform={translate}>
				{pie.map((d, i) => this.arcGenerator(d, this.props.unit, i))}

				<text textAnchor="middle" fontSize="13pt">{this.props.currentValue+" "+this.props.unit}</text>

				<line 
					x1={0.5*this.props.innerRadius*Math.cos(this.props.arrowAngle)} 
					y1={0.5*this.props.innerRadius*Math.sin(this.props.arrowAngle)} 
					x2={this.props.y*Math.cos(this.props.arrowAngle)} 
					y2={this.props.y*Math.sin(this.props.arrowAngle)} 
					stroke="black" />
			</g>
		);
	}
}
 
export default DialControl;
