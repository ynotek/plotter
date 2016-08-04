import React from 'react'
import { Animate, Handlers, Layer, Ticks, Lines, Chart } from 'rumble-charts'

// // Get min and max of all dates for all the lines.
// x.domain([
//     d3.min(csvdata, function(d) {
//         return d.date;

//     }),
//     d3.max(csvdata, function(d) {
//         return d.date;
//     })
// ]);

// // Get 0 and max of all prices for all the lines.
// y.domain([
//     0,
//     d3.max(csvdata, function(d) {
//         return d.price;     
//     })
// ]);

// x2.domain(x.domain());
// y2.domain(y.domain());

var overed = null;

export default class DPlot extends React.Component {
	constructor(props) {
		super(props);

		let hovered = null;
		const hideHovered = () => {
			if (hovered && hovered.circle) {
				hovered.circle.setAttribute('r', hovered.radius);
				hovered.circle.style.fillOpacity = hovered.opacity;
				if (hovered.label) {
					hovered.label.style.display = 'none';
				}
			}
		};

		this.handleMouseMove = ({closestPoints}) => {
			const closest = closestPoints[0];
			if (!closest) {
				return;
			}
			const {seriesIndex, pointIndex} = closest;
			const circle = document.querySelector(`circle.dots-circle-${seriesIndex}-${pointIndex}`);
			if (!circle) {
				return;
			}
			hideHovered();
			const label = document.querySelector(`.labels-label-${seriesIndex}-${pointIndex}`);
			hovered = {circle, label, radius: circle.getAttribute('r'), opacity: circle.style.fillOpacity};
			circle.setAttribute('r', 10);
			circle.style.fillOpacity = 1;
			if (label) {
				label.style.display = 'block';
			}
		};

		this.handleMouseLeave = () => {
			hideHovered();
		};
	}

	getData() {
		return [ {
			data : this.props.data.map(function(p) { return parseFloat(p.y); })
		} ]
	}

	render() {
		var x = function(d) {
			return d.x;
		};

		return (
			<Chart width={300} height={400} series={this.getData()} minY={0}>
			<Layer width='100%' height='90%' position='top center'>
			<Handlers onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseLeave} optimized={false}>
			<Animate>
			<Ticks
			axis='y'
			lineLength='100%'
			lineVisible={true}
			lineStyle={{stroke:'lightgray'}}
			labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray'}}
			labelAttributes={{x: -5}}
			/>
			<Ticks
			axis='x'
			label={x}
			labelStyle={{textAnchor:'middle',dominantBaseline:'text-before-edge',fill:'lightgray'}}
			labelAttributes={{y: 3}}
			/>
			<Lines />
			</Animate>
			</Handlers>
			</Layer>
			</Chart>
			)
	}
}