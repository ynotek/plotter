import React from 'react'
var Line = require("react-chartjs").Line;

export default class Plot extends React.Component {
	constructor(props) {
		super(props);
	}

	getPlot() {
		const labels = this.props.data.map(function(p) { return p.x });
		const values = this.props.data.map(function(p) { return p.y });

		return {
			type: "line",
			labels: labels,
			datasets: [ { data: values } ]
		};
	}

	render() {
		const chartOptions = {
			bezierCurve : false,
            datasetFill : false,
            pointDotStrokeWidth: 4,
            scaleShowVerticalLines: false,
            responsive: true
        };

        return (
         <Line data={this.getPlot()} options={chartOptions} redraw width="500" height="250"/>
         );
    }
}

Plot.propTypes = {
	chartData: React.PropTypes.object
}