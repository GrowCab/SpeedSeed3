// ./src/components/Piechart/index.jsx
 
import React, { Component } from "react";
import { pie } from "d3";
import * as scale  from "d3-scale";
import DialSetting  from "./Arc";
 
class DialControl extends Component {
	constructor() {
		super();
		this.pie = pie().value((d) => d.value);

		this.colors = scale.scaleOrdinal(scale.schemeCategory20);
	}
	arcGenerator(d, u, i) {
		return (
			<DialSetting key={`arc-${i}`}
				data={d}
				unit={u}
				innerRadius={this.props.innerRadius}
				outerRadius={this.props.outerRadius}
				padAngle={this.props.padAngle}
				color={this.colors(i)} />
		);
	}

	render() {
		let pie = this.pie(this.props.data),
			translate = `translate(${this.props.x}, ${this.props.y})`;

		return (
			<g transform={translate}>
				{pie.map((d, i) => this.arcGenerator(d, this.props.unit, i))}
				<text textAnchor="middle">{this.props.currentValue}</text>
			</g>
		);
	}
}
 
export default DialControl;
