import React from 'react'
import ReactDOM from 'react-dom'
var Papa =  require('../../public/js/papaparse.min.js')
import { LineChart } from 'react-d3'
import { Col, Row, Input, Button } from 'react-bootstrap'
import Plot from './Plot.jsx'
import DPlot from './DPlot.jsx'

export default class Body extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [ { x: 0, y: 0 }]
		}
	}

	handleChange(event) {
		this.parseCsv(event.target.files[0]);
	}

	parseCsv(file) {
		var passed_this = this;

		Papa.parse(file, {
			complete(results) {
				var parseData = [];
				const firstTimestamp = results.data[1][0];

				for (var i = 1; i < results.data.length - 1; i++) {
					var point = results.data[i];
					// Time in ns
					point[0] = point[0] - firstTimestamp;
					point[0] = (point[0] / 1000000).toFixed(2);
					parseData.push({ x: i - 1, y: point[1] });
				}

				passed_this.setState({ data: parseData });
			}
		});
	}

	render() {
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-4">
						<div className="chart-wrapper">
							<div className="chart-title">Upload file</div>
							<div className="chart-stage">
								<form className='col-xs-offset-3 col-xs-6'>
									<input type="file" onChange={this.handleChange.bind(this)} />
								</form>	
							</div>
						</div>
					</div>

					<div className="col-sm-8">
						<div className="chart-wrapper">
						<div className="chart-title">
						Pageviews by browser (past 24 hours)
						</div>
						<div className="chart-stage">
							<Plot data={this.state.data}/>
						</div>
						<div className="chart-notes">
						This is a sample text region to describe this chart.
						</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-12">
						<div className="chart-wrapper">
						<div className="chart-title">Bokeh</div>
						<div className="chart-stage">
							<DPlot data={this.state.data} name={'d3-plot'}/>
						</div>
						<div className="chart-notes">
						This is a sample text region to describe this chart.
						</div>
						</div>
					</div>
				</div>

			</div>
			)
	}
}