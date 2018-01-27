import React, { Component } from 'react'
import './App.css'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { arc, pie } from 'd3-shape'
class ArcChart extends Component {
   constructor(props){
      super(props)
      this.createArcChart = this.createArcChart.bind(this)
   }
   componentDidMount() {
      this.createArcChart()
   }
   componentDidUpdate() {
      this.createArcChart()
   }
   createArcChart() {
      const node = this.node
      const dataMax = max(this.props.data)
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]])
   }
render() {
    const rart = arc().innerRadius(0)
        .outerRadius(100)
        .startAngle(0)
        .endAngle(Math.PI/2)
        .cornerRadius(5)
        .padAngle(5);
      return <svg ref={node => this.node}
      width={500} height={500}>
      {rart}
      </svg>
   }
}
export default ArcChart
